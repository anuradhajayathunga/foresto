import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        {/* Floating Centered Navbar */}
        <header className="w-full flex justify-center pt-6 sticky top-0 z-50">
          <nav className="w-full max-w-4xl mx-4 bg-black/40 backdrop-blur-xl border border-border-dark rounded-2xl">
            <div className="px-6 py-3 flex justify-between items-center">
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Foresto
              </span>
              <div className="flex gap-1">
                {[
                  { name: "Predict", href: "/predict" },
                  { name: "Result", href: "/prediction-result" },
                  { name: "Supplier", href: "/supplier-data" },
                  { name: "Menu", href: "/menu-calc" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </header>

        {/* This container forces the Page Content to stay perfectly in the middle */}
        <main className="flex-grow flex items-center justify-center p-6">
           {children}
        </main>
      </body>
    </html>
  );
}