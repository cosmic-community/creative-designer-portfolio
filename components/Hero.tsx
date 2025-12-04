import { About } from '@/types'
import Link from 'next/link'

interface HeroProps {
  about: About | null
}

export default function Hero({ about }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                Creative Designer
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              {about?.metadata.headline || 'Creative Designer Crafting Digital Experiences'}
            </h1>
            
            {about?.metadata.years_experience && (
              <p className="text-2xl text-gray-600">
                {about.metadata.years_experience}+ years of experience creating beautiful, functional designs
              </p>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-primary">
                View My Work
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
            
            {about?.metadata.skills && about.metadata.skills.length > 0 && (
              <div className="pt-8">
                <p className="text-sm text-gray-500 mb-3 uppercase tracking-wide">Specializing In</p>
                <div className="flex flex-wrap gap-2">
                  {about.metadata.skills.slice(0, 5).map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {about?.metadata.profile_photo && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-accent opacity-20 rounded-full blur-3xl"></div>
                <img 
                  src={`${about.metadata.profile_photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt="Profile"
                  className="relative rounded-full shadow-2xl w-full max-w-md"
                  width="400"
                  height="400"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}