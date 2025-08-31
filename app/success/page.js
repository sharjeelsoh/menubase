'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const params = useSearchParams();
  const slug = params.get('slug');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const markItemSold = async () => {
      const res = await fetch('/api/mark-sold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      setDone(true);
    };

    if (slug) markItemSold();
  }, [slug]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold">Thank you for your purchase :)</h1>
      <p className="mt-2">{done ? 'Item marked as sold. i will reach out to you soon with your tracking' : 'Updating item status...'}</p>
    </main>
  );
}