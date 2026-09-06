import type {
  IdentityData,
  ExperienceItem,
  ProjectItem,
  EducationItem,
} from "./types";

interface ContentData {
  identity: IdentityData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

const CMS_API_URL = import.meta.env.CMS_API_URL || "http://localhost:8080";

export async function getContent(): Promise<ContentData> {    
  const res = await fetch(`${CMS_API_URL}/api/content`);

  if (!res.ok) {
    throw new Error(`Gagal mengambil data dari CMS: ${res.status}`);
  }

  return res.json();
}
