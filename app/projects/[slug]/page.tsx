import { cosmic, hasStatus } from '@/lib/cosmic'
import { Project, CosmicSingleResponse } from '@/types'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response as CosmicSingleResponse<Project>).object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }
  
  return {
    title: `${project.metadata.title} - Alex Morgan Portfolio`,
    description: project.metadata.description.substring(0, 160),
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    notFound()
  }
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <Link href="/projects" className="text-accent hover:underline mb-4 inline-block">
              ← Back to Projects
            </Link>
            <h1 className="text-5xl font-bold mb-4">{project.metadata.title}</h1>
            {project.metadata.client && (
              <p className="text-xl text-gray-600">Client: {project.metadata.client}</p>
            )}
            {project.metadata.project_date && (
              <p className="text-gray-500 mt-2">
                {new Date(project.metadata.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </p>
            )}
            {project.metadata.tags && project.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.metadata.tags.map((tag) => (
                  <span key={tag} className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Featured Image */}
        {project.metadata.featured_image && (
          <section className="py-8">
            <div className="container-custom">
              <img 
                src={`${project.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt={project.metadata.title}
                className="w-full rounded-lg shadow-lg"
                width="800"
                height="450"
              />
            </div>
          </section>
        )}
        
        {/* Description */}
        <section className="py-12">
          <div className="container-custom">
            <div className="prose prose-lg max-w-3xl mx-auto">
              <ReactMarkdown>{project.metadata.description}</ReactMarkdown>
            </div>
          </div>
        </section>
        
        {/* Gallery */}
        {project.metadata.gallery && project.metadata.gallery.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.metadata.gallery.map((image, index) => (
                  <img 
                    key={index}
                    src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={`${project.metadata.title} - Image ${index + 1}`}
                    className="w-full rounded-lg shadow-md"
                    width="400"
                    height="300"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}