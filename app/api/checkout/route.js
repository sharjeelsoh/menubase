import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { item } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // price in cents
          },
          quantity: 1,
        },
      ],
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Standard Shipping',
            type: 'fixed_amount',
            fixed_amount: {
              amount: item.shipping * 100, // price in cents
              currency: 'aud',
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['AU'], // Or more if you want international
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?slug=${item.slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/${item.slug}`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
