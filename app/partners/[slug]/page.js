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

  // Hard-coded menu
  const menuSections = [
    {
      title: "Appetizers",
      items: [
        { name: "Garlic Bread", price: 6, description: "Toasted bread with garlic and herbs." },
        { name: "Bruschetta", price: 8, description: "Tomatoes, basil, olive oil on toasted bread." },
      ],
    },
    {
      title: "Main Courses",
      items: [
        { name: "Margherita Pizza", price: 14, description: "Classic pizza with tomato, mozzarella, basil." },
        { name: "Spaghetti Bolognese", price: 16, description: "Spaghetti with rich meat sauce." },
        { name: "Grilled Salmon", price: 22, description: "Served with roasted vegetables and lemon butter." },
      ],
    },
    {
      title: "Desserts",
      items: [
        { name: "Tiramisu", price: 9, description: "Coffee-flavored Italian dessert." },
        { name: "Panna Cotta", price: 8, description: "Creamy vanilla dessert with berry sauce." },
      ],
    },
    {
      title: "Drinks",
      items: [
        { name: "Coke", price: 3 },
        { name: "Orange Juice", price: 4 },
        { name: "Coffee", price: 4 },
      ],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

      <Link
        href="/partners"
        className="mb-6 inline-block px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-lg transition"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center">{partner.name}</h1>

      {menuSections.map((section) => (
        <section key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid gap-4">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-start bg-white p-4 rounded-xl shadow-sm hover:shadow-md transitionb border-1 border-red-600"
              >
                <div className='flex flex-col items-start'>
                  <h3 className="text-lg">{item.name}</h3>
                  {item.description && <p className="text-gray-600 text-sm mt-1">{item.description}</p>}
                </div>
                <div className="text-lg font-semibold">${item.price}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}