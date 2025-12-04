import { cosmic, hasStatus } from '@/lib/cosmic'
import { Project, CosmicResponse } from '@/types'
import ProjectCard from '@/components/ProjectCard'
import Navigation from '@/components/Navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Alex Morgan Portfolio',
  description: 'Browse through my creative design projects and case studies',
}

async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response as CosmicResponse<Project>).objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  // Get all unique tags
  const allTags = new Set<string>()
  projects.forEach(project => {
    project.metadata.tags?.forEach(tag => allTags.add(tag))
  })
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Projects</h1>
              <p className="text-xl text-gray-600">
                A collection of my creative work and case studies
              </p>
            </div>
            
            {projects.length === 0 ? (
              <p className="text-center text-gray-600">No projects available yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}