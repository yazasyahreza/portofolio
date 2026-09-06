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

export interface ExperienceItem {
  position: string;
  organization: string;
  location: string;
  logoUrl: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  skills: string[];
  media: MediaItem[];
}

export interface ProjectItem {
  title: string;
  description: string;
  builtDate: string;
  techStack: string[];
  githubUrl: string;
  imageUrl: string;
}

export interface EducationItem {
  institutionName: string;
  institutionLogoUrl: string;
  major: string;
  startYear: string;
  endYear: string | null;
  isCurrent: boolean;
  media: MediaItem[];
  skills: string[];
}
