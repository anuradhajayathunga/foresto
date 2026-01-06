'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          ML Ingredient Price Prediction System
        </h1>

        <Link
          href="/predict"
          className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Start Prediction
        </Link>
      </main>
    </div>
  );
}
