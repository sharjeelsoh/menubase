import supabase from '@/lib/supabaseServerClient';

export async function POST(req) {
  const { slug } = await req.json();

  const { data, error } = await supabase
    .from('shop_items')
    .update({ status: 'sold' })
    .eq('slug', slug);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}