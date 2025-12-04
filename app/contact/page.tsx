import { cosmic, hasStatus } from '@/lib/cosmic'
import { Contact, CosmicSingleResponse } from '@/types'
import Navigation from '@/components/Navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Alex Morgan Portfolio',
  description: 'Get in touch with Alex Morgan for design projects and collaborations',
}

async function getContact(): Promise<Contact | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'contact', slug: 'contact-information' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return (response as CosmicSingleResponse<Contact>).object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function ContactPage() {
  const contact = await getContact()
  
  if (!contact) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20">
          <section className="py-20">
            <div className="container-custom text-center">
              <p className="text-gray-600">Contact information not available.</p>
            </div>
          </section>
        </main>
      </>
    )
  }
  
  const socialLinks = [
    { name: 'LinkedIn', url: contact.metadata.linkedin_url, icon: 'in' },
    { name: 'Instagram', url: contact.metadata.instagram_url, icon: 'ig' },
    { name: 'Behance', url: contact.metadata.behance_url, icon: 'be' },
    { name: 'Dribbble', url: contact.metadata.dribbble_url, icon: 'dr' },
  ].filter(link => link.url)
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold mb-4 text-center">Get in Touch</h1>
              <p className="text-xl text-gray-600 mb-12 text-center">
                I'd love to hear about your project
              </p>
              
              {contact.metadata.availability_status && (
                <div className="bg-accent bg-opacity-10 border-2 border-accent rounded-lg p-6 mb-12 text-center">
                  <p className="text-accent font-semibold text-lg">
                    {contact.metadata.availability_status.value}
                  </p>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <a 
                    href={`mailto:${contact.metadata.email}`}
                    className="text-accent hover:underline text-lg"
                  >
                    {contact.metadata.email}
                  </a>
                </div>
                
                {contact.metadata.phone && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <a 
                      href={`tel:${contact.metadata.phone}`}
                      className="text-accent hover:underline text-lg"
                    >
                      {contact.metadata.phone}
                    </a>
                  </div>
                )}
                
                {contact.metadata.location && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <p className="text-gray-700 text-lg">{contact.metadata.location}</p>
                  </div>
                )}
                
                {socialLinks.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Connect</h3>
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((link) => (
                        <a 
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-dark transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}