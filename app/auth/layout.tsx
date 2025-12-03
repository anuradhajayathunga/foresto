// app/auth/layout.tsx
import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full flex overflow-hidden items-center justify-center  px-4 py-8">
      {/* Decorative background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div> */}
      <div className="relative w-full max-w-6xl">{children}</div>
    </div>
  );
}