import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

export const metadata: Metadata = {
  title: '30-Day Real Posting Model',
  description:
    'Generate a personalized 30-day content roadmap designed to keep your brand consistent and engaging across platforms.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950 text-white">
      <body
        className={clsx(
          inter.variable,
          manrope.variable,
          'min-h-screen bg-slate-950 font-body antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
