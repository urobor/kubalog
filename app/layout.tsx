import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Fieldnotes — Kuba’s personal log',description:'Things learned, built, and noticed. A personal log by Kuba.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
