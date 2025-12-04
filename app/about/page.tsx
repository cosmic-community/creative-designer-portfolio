import { cosmic, hasStatus } from '@/lib/cosmic'
import { About, CosmicSingleResponse } from '@/types'
import Navigation from '@/components/Navigation'
import ReactMarkdown from 'react-markdown'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Alex Morgan Portfolio',
  description: 'Learn more about Alex Morgan and their creative design experience',
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

export default async function AboutPage() {
  const about = await getAbout()
  
  if (!about) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20">
          <section className="py-20">
            <div className="container-custom text-center">
              <p className="text-gray-600">About information not available.</p>
            </div>
          </section>
        </main>
      </>
    )
  }
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6">{about.metadata.headline}</h1>
                {about.metadata.years_experience && (
                  <p className="text-2xl text-accent font-semibold mb-4">
                    {about.metadata.years_experience}+ Years of Experience
                  </p>
                )}
              </div>
              {about.metadata.profile_photo && (
                <div className="flex justify-center lg:justify-end">
                  <img 
                    src={`${about.metadata.profile_photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                    alt="Profile"
                    className="rounded-lg shadow-xl w-full max-w-md"
                    width="300"
                    height="300"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Bio Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="prose prose-lg max-w-3xl mx-auto">
              <ReactMarkdown>{about.metadata.bio}</ReactMarkdown>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        {about.metadata.skills && about.metadata.skills.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {about.metadata.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="bg-white px-6 py-3 rounded-lg shadow-md text-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}