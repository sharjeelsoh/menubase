'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ItemDetailsClient({ item }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating Stripe session');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center">
        <div className="max-w-xl">
            <div>
                <Link href="/shop" className="text-blue-600 hover:underline">&lt; back</Link>
            </div>
            <h1 className="mt-4 text-2xl font-bold mb-2 space-x-2">{item.title}</h1>
            
            <p><b>price: </b>${item.price} aud</p>
            <p><b>shipping (au only): </b>${item.shipping} aud</p>
            <p><b>status: </b>{item.status}</p>
            <p><b>category: </b>{item.category}</p>
            <p><b>condition: </b>{item.condition}</p>
            
            <p className='mt-2'><b>description</b></p>
            {Array.isArray(item.description) ? (
            item.description.map((para, i) => (
                <p key={i} className='mb-2'>
                {para}
                </p>
            ))
            ) : (
            <p>{item.description}</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-fit">
                {item.images.map((img, idx) => (
                    <a key={idx} href={`/images/shop/${img}`} target="_blank" className="block">
                    <Image
                        src={`/images/shop/${img}`}
                        alt={`Image ${idx}`}
                        width={100}
                        height={100}
                        className="border object-cover"
                    />
                    </a>
                ))}
            </div>
            { item.status == "available" ?
              <button
                  type="button"
                  onClick={handleBuy}
                  disabled={loading}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
                  >
                  {loading ? 'processing...' : 'buy now'}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
              :
              <></>
            }
        </div>
    </main>
  );
}
