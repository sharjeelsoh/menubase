import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function Projects() {

  const { data: projects, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
        console.error('Error fetching projects:', error.message);
        return <p>failed to load projects</p>;
    }

  return (
    <main className="flex flex-col items-center text-center justify-center">
      <div className="max-w-xl">
        <h1 className="text-2xl font-bold mb-4">projects</h1>
        <ul className="text-center space-y-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="text-blue-600 hover:underline">
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}