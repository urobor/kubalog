import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const blogSettings = sqliteTable('blog_settings', {
 id: integer('id').primaryKey(), ownerId: text('owner_id').notNull(),
});
export const entries = sqliteTable('entries', {
 id: text('id').primaryKey(), title: text('title').notNull(), summary: text('summary').notNull(),
 content: text('content').notNull(), topic: text('topic').notNull(), date: text('date').notNull(),
 published: integer('published',{mode:'boolean'}).notNull().default(false),
 createdAt: text('created_at').notNull(),
});
