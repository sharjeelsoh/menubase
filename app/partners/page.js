import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function Projects() {

  const { data: partners, error } = await supabase
    .from('partners')
    .select('*')
    .order('reviews', { ascending: false });

  if (error) {
        return <p>failed to load partners</p>;
    }

  return (
    <main>
      <div>
        <h1>partners</h1>
        <ul>
          {partners.map((partner) => (
            <li key={partner.slug}>
              <Link href={`/partners/${partner.slug}`} className="text-blue-600 hover:underline">
                {partner.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}