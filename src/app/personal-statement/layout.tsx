
// src/app/personal-statement/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css'; // Reuse global styles for theming consistency

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Personal Statement', // This will be the browser tab title
  description: 'Personal statement for application.',
};

export default function PersonalStatementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}>
        {/* No complex header or footer needed, just the content */}
        <main className="py-4">{children}</main> 
      </body>
    </html>
  );
}
