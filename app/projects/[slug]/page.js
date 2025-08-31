import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function ProjectPage({ params }) {

  const { slug } = await params;

  const { data: project, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .single();

  if (error || !project) {
    console.error(error);
    return <p>project not found</p>;
  }

  return (
    <main className="flex flex-col items-center text-center justify-center lowercase">
      <div className="max-w-xl w-full text-left space-y-3">
        <div>
          <Link href="/projects" className="text-blue-600 hover:underline">&lt; back</Link>
        </div>
        <div className="flex items-flex space-x-2">
          <h1 className="text-2xl font-bold">{project.title}</h1>
        </div>
        
        {project.tech?.length > 0 && (
          <ul className=" list-disc list-inside">
            {project.tech.map((tech, i) => <li key={i}>{tech}</li>)}
          </ul>
        )}

        {Array.isArray(project.description) ? (
          project.description.map((para, i) => (
            <p key={i}>
              {para}
            </p>
          ))
        ) : (
          <p>{project.description}</p>
        )}

        <div className="flex space-x-4">
          <p>related links:</p>
          {project.github && (
            <Link href={project.github} target="_blank" className="underline text-blue-600">
              GitHub
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank" className="underline text-blue-600">
              YT Demo
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}