import { supabase } from '@/lib/supabaseClient';

export default async function ShopItemPage({ params }) {

  const { slug } = await params;

  const { data: item, error } = await supabase
      .from('shop_items')
      .select('*')
      .eq('slug', slug)
      .single();

  if (error || !item) {
    console.error(error);
    return <p>item not found</p>;
  }

  // Import only after data is ready (not top-level)
  const ItemDetailsClient = (await import('./ItemDetailsClient')).default;

  return <ItemDetailsClient item={item} />;
}