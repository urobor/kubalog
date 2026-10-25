import {getDb} from '../../../db';
import {blogSettings, entries} from '../../../db/schema';
import {getChatGPTUser} from '../../chatgpt-auth';
import {eq,desc} from 'drizzle-orm';
export const dynamic='force-dynamic';
const json=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
async function owner() {
 const user=await getChatGPTUser();
 const db=getDb();
 const [settings]=await db.select().from(blogSettings).where(eq(blogSettings.id,1));
 return {db,user,isOwner:!!user && settings?.ownerId===user.userId,initialized:!!settings};
}
export async function GET(){
 try {const {db,isOwner,initialized,user}=await owner();
 const rows=await db.select().from(entries).where(isOwner?undefined:eq(entries.published,true)).orderBy(desc(entries.date),desc(entries.createdAt));
 return json({entries:rows,isOwner,initialized,signedIn:!!user});
 }catch{return json({error:'The log could not be loaded. Please try again.'},503)}
}
export async function POST(request:Request){
 try {
 const origin=request.headers.get('origin');
 if(!origin || origin!==new URL(request.url).origin)return json({error:'Invalid request origin.'},403);
 const context=await owner(); const {db,user,isOwner,initialized}=context;
 if(!user)return json({error:'Please sign in first.'},401);
 const raw=await request.json();
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return json({error:'Invalid request.'},400);
 const body=raw as Record<string,unknown>;
 // Initial setup is performed by the owner while this new Site is owner-private.
 // Ownership is stored permanently before the Site can be shared with visitors.
 if(body.action==='initialize'){
 if(initialized)return json({error:'This log has already been set up.'},409);
 await db.insert(blogSettings).values({id:1,ownerId:user.userId}).onConflictDoNothing();
 const [s]=await db.select().from(blogSettings).where(eq(blogSettings.id,1));
 return s.ownerId===user.userId?json({ok:true}):json({error:'Already configured.'},403);
 }
 if(!isOwner)return json({error:'Only the author can change entries.'},403);
 if(body.action==='delete'){
 if(typeof body.id!=='string')return json({error:'Missing entry.'},400);
 await db.delete(entries).where(eq(entries.id,body.id));return json({ok:true});
 }
 if(body.action!=='save')return json({error:'Unknown action.'},400);
 const {title,content,summary,topic,date,published,id}=body;
 if(typeof title!=='string'||!title.trim()||title.length>180||typeof content!=='string'||!content.trim()||content.length>100000||typeof topic!=='string'||!topic.trim()||topic.length>40||typeof summary!=='string'||summary.length>600||typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||typeof published!=='boolean')return json({error:'Please add a title, topic, date, and entry text. Keep the summary under 600 characters.'},400);
 const values={title:title.trim(),content:content.trim(),summary:summary.trim()||content.trim().slice(0,240),topic:topic.trim(),date,published};
 if(id){
 if(typeof id!=='string')return json({error:'Invalid entry.'},400);
 const updated=await db.update(entries).set(values).where(eq(entries.id,id)).returning({id:entries.id});
 if(!updated.length)return json({error:'Entry not found.'},404);
 }else await db.insert(entries).values({...values,id:crypto.randomUUID(),createdAt:new Date().toISOString()});
 return json({ok:true});
 }catch{return json({error:'Your changes could not be saved. Please try again.'},500)}
}
