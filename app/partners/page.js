import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

function Stars({ value = 0 }) {
  // Clamp 0–5 and round to nearest 0.5
  const normalized = Math.max(0, Math.min(5, Number(value) || 0));
  const rounded = Math.round(normalized * 2) / 2;

  const full = Math.floor(rounded);
  const half = rounded % 1 === 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rounded} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <IoIosStar key={`full-${i}`} size={18} className="text-yellow-500" aria-hidden />
      ))}
      {half === 1 && <IoIosStarHalf size={18} className="text-yellow-500" aria-hidden />}
      {Array.from({ length: empty }).map((_, i) => (
        <IoIosStarOutline key={`empty-${i}`} size={18} className="text-gray-300" aria-hidden />
      ))}
    </div>
  );
}

export default async function Partners() {

  const { data: partners, error } = await supabase
    .from('partners')
    .select('*')
    .eq("status", true) // only active partners
    .order('reviews', { ascending: false });

  if (error) {
        return <p>failed to load partners</p>;
    }

  return (
    <main>
      <div>
        <h1 className="text-2xl font-bold mb-4">Partners</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 p-2">
          {partners.map((partner) => (
            <Link
              key={partner.slug}
              href={`/partners/${partner.slug}`}
              className="flex-shrink-0"
            >
              <div className="w-64 h-48 bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900">
                  {partner.name}
                </h3>

                {partner.address && (
                  <p className="text-sm text-gray-600 mt-2">
                    {partner.address}
                  </p>
                )}

                {/* Push stars to the bottom */}
                <div className="mt-auto pt-3">
                  <Stars value={partner.reviews} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}