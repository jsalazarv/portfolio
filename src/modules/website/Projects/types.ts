export interface Project {
  id: string;
  title: string;
  descriptionKey: string;
  coverImage?: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
}
