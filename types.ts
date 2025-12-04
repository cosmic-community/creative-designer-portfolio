// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title: string;
    description: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    client?: string;
    project_date?: string;
    tags?: string[];
  };
}

// About interface
export interface About extends CosmicObject {
  type: 'about';
  metadata: {
    headline: string;
    bio: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    skills?: string[];
    years_experience?: number;
  };
}

// Contact interface
export interface Contact extends CosmicObject {
  type: 'contact';
  metadata: {
    email: string;
    phone?: string;
    location?: string;
    linkedin_url?: string;
    instagram_url?: string;
    behance_url?: string;
    dribbble_url?: string;
    availability_status?: {
      key: string;
      value: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}