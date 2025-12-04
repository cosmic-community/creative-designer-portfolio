import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-primary">
            Alex Morgan
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-accent font-medium transition-colors">
              Home
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-accent font-medium transition-colors">
              Projects
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-accent font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-dark transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}