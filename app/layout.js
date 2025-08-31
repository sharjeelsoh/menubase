// /app/layout.js
import Link from "next/link";
import './globals.css';
import { Suspense } from 'react';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/" className="text-blue-600 hover:underline">home</Link>
            <Link href="/about" className="text-blue-600 hover:underline">about</Link>
            <Link href="/partners" className="text-blue-600 hover:underline">partners</Link>
            <Link href="/contact" className="text-blue-600 hover:underline">contact</Link>
          </nav>
        </header>
        
        <main>
          <Suspense>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}