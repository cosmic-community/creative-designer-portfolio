import { Project } from '@/types'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {project.metadata.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={`${project.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={project.metadata.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width="400"
              height="300"
            />
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
            {project.metadata.title}
          </h3>
          
          {project.metadata.client && (
            <p className="text-gray-600 mb-3">Client: {project.metadata.client}</p>
          )}
          
          {project.metadata.tags && project.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.metadata.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}