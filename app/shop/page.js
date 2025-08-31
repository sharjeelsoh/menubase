import Link from 'next/link';
export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabaseClient';

export default async function Shop() {

    const { data: items, error } = await supabase
    .from('shop_items')
    .select('*')
    .order('status', { ascending: true }); // 'available' comes before 'sold'

    if (error) {
        console.error('Error fetching items:', error.message);
        return <p>failed to load items</p>;
    }

    return (
    <main className="flex flex-col items-center text-center justify-center">
        <div className="max-w-xl">
            <h1 className="text-2xl font-bold mb-2">shop</h1>
            <p className='mb-2'>selling some items that i own that i think you should buy.</p>
            <table className="w-full table-auto border">
            <thead>
                <tr>
                <th className="border px-2 py-1 text-left">title</th>
                <th className="border px-2 py-1 text-left">price</th>
                <th className="border px-2 py-1 text-left">status</th>
                <th className="border px-2 py-1 text-left">more info</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                <tr key={item.slug}>
                    <td className="border px-2 py-1 text-left">{item.title}</td>
                    <td className="border px-2 py-1">${item.price} aud</td>
                    <td className="border px-2 py-1">{item.status}</td>
                    <td className="border px-2 py-1">
                    <Link href={`/shop/${item.slug}`} className="underline text-blue-600">details</Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </main>
    );
}