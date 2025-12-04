import { cosmic, hasStatus } from '@/lib/cosmic'
import { Project, About, CosmicResponse, CosmicSingleResponse } from '@/types'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import Hero from '@/components/Hero'

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

async function getAbout(): Promise<About | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about', slug: 'about-me' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return (response as CosmicSingleResponse<About>).object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function HomePage() {
  const [projects, about] = await Promise.all([
    getProjects(),
    getAbout()
  ])
  
  return (
    <main>
      <Hero about={about} />
      
      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600">Explore my latest design projects</p>
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
          
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 opacity-90">
            Have a project in mind? I'd love to hear about it.
          </p>
          <Link href="/contact" className="bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  )
}