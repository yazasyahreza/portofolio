export interface SocialLink {
  platform: string;
  url: string;
}

export interface TechSkill {
  name: string;
  slug: string;
}

export interface IdentityData {
  name: string;
  title: string;
  location: string;
  aboutText: string;
  avatarUrl: string;
  coverImageUrl: string;
  socialLinks: SocialLink[];
  skills: TechSkill[];
}

export interface MediaItem {
  imageUrl: string;
  title: string;
  description: string;
  githubUrl?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  builtDate: string;
  duration: string;
  story: string;
  techStack: string[];
  githubUrl: string;
  imageUrl: string;
}
