# Creative Designer Portfolio

![App Preview](https://imgix.cosmicjs.com/d11defe0-d159-11f0-b20e-1d251587b0cd-photo-1507003211169-0a1dd7228f2d-1764884413785.jpg?w=1200&h=300&fit=crop,auto=format,compress)

A stunning, professional portfolio website for creative designers showcasing their work, skills, and experience. Built with Next.js 16 and Cosmic CMS.

## Features

- 🎨 **Beautiful Project Showcase** - Grid layout with filtering capabilities by project tags
- 📱 **Fully Responsive** - Mobile-first design that works perfectly on all devices
- ⚡ **Fast Performance** - Server-side rendering with Next.js 16 for optimal speed
- 🎯 **SEO Optimized** - Metadata and semantic HTML for better search visibility
- 🖼️ **Image Galleries** - Interactive project galleries with optimized images
- 💼 **Professional About Page** - Skills showcase, bio, and experience
- 📬 **Contact Integration** - Email, phone, location, and social media links
- 🔄 **Dynamic Content** - All content managed through Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6931ff533584465d0a2f7c81&clone_repository=6932009f3584465d0a2f7cc5)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a portfolio for a creative designer with projects showcasing work, an about page with bio, and contact information"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching About Information
```typescript
const { object: about } = await cosmic.objects
  .findOne({ type: 'about', slug: 'about-me' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Fetching Contact Information
```typescript
const { object: contact } = await cosmic.objects
  .findOne({ type: 'contact', slug: 'contact-information' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This portfolio uses the following Cosmic object types:

- **Projects** - Portfolio work with featured images, galleries, descriptions, and tags
- **About** - Designer bio, headline, profile photo, skills, and experience
- **Contact** - Email, phone, location, social links, and availability status

All content is fetched server-side for optimal performance and SEO.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Connect your repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

<!-- README_END -->