'use client';

import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'cureai - ai healthcare chatbot',
//   description:
//     'identify possible illnesses, get remedies, and diet suggestions with ai.',
//   keywords: [
//     'ai',
//     'healthcare',
//     'chatbot',
//     'symptoms',
//     'diagnosis',
//     'remedy',
//     'diet',
//   ],
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-body antialiased'
        )}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <Loader className="w-12 h-12 animate-spin text-primary" />
            </div>
          }
        >
          <I18nextProvider i18n={i18n}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                <AppLayout>{children}</AppLayout>
                <Toaster />
              </AuthProvider>
            </ThemeProvider>
          </I18nextProvider>
        </Suspense>
      </body>
    </html>
  );
}
