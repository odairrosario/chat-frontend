import React from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/providers/query-client-proveider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-">
      <body suppressHydrationWarning>
        <div className="fixed inset-0 -z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        </div>
        <main className="relative z-0 min-h-screen">
          <QueryProvider>
            {children}
          </QueryProvider>
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}