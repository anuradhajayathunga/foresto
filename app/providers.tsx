'use client';

import { SidebarProvider } from '@/components/Layouts/sidebar/sidebar-context';
import { ToastProvider } from '@/components/toast/ToastProvider';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='light' attribute='class'>
      <ToastProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
