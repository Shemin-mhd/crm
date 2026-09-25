'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { EnterpriseCrmProvider } from '@/context/EnterpriseCrmContext';
import { EnterpriseTopHeader } from '@/components/layout/EnterpriseTopHeader';
import { EnterpriseNavbar } from '@/components/layout/EnterpriseNavbar';

export function EnterpriseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <EnterpriseCrmProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased w-full max-w-full">
          {children}
        </div>
      </EnterpriseCrmProvider>
    );
  }

  return (
    <EnterpriseCrmProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans antialiased w-full max-w-full">
        {/* Level 1: Top Brand & Profile Header */}
        <React.Suspense fallback={<div className="h-12 bg-white border-b border-slate-200" />}>
          <EnterpriseTopHeader />
        </React.Suspense>

        {/* Level 2: Sticky Horizontal Navbar with Module Dropdowns */}
        <React.Suspense fallback={<div className="h-10 bg-slate-900 border-b border-slate-800" />}>
          <EnterpriseNavbar />
        </React.Suspense>

        {/* Main Application Container — 100% Full Width Edge-to-Edge */}
        <main className="flex-1 px-2.5 sm:px-6 lg:px-8 py-3 sm:py-4 w-full max-w-full min-w-0 animate-in fade-in duration-150">
          <React.Suspense fallback={<div className="p-8 text-center text-slate-400">Loading...</div>}>
            {children}
          </React.Suspense>
        </main>
      </div>
    </EnterpriseCrmProvider>
  );
}
