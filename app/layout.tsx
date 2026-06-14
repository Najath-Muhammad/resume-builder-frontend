import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { APP_NAME } from '@/constants/app.constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'Build ATS-optimized, AI-powered resumes in minutes. Create, customize, and download professional resumes tailored to your target job.',
  keywords: ['resume builder', 'AI resume', 'ATS optimization', 'cover letter'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}
