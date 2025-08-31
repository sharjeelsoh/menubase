import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function ProjectPage({ params }) {

  const { slug } = await params;

  const { data: partner, error } = await supabase
      .from('partners')
      .select('*')
      .eq('slug', slug)
      .single();

  if (error || !partner) {
    console.error(error);
    return <p>partner not found</p>;
  }

  return (
    <main className="">
      <div className="">
        <div>
          <Link href="/partners" className="text-blue-600 hover:underline">&lt; back</Link>
        </div>
        <div>
          <h1>{partner.name}</h1>
          <p>{partner.address}</p>
          <p>{partner.reviews}</p>
          <p>{partner.status}</p>
        </div>
      </div>
    </main>
  );
}