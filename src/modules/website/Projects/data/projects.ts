import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "poctapoc",
    title: "Poctapoc",
    descriptionKey: "projects.items.poctapoc.description",
    techStack: [
      "NestJS",
      "Flutter",
      "PostgreSQL",
      "Docker",
      "Railway",
      "MinIO",
      "Resend",
    ],
    demoUrl: "https://poctapoc.com/",
  },
  {
    id: "portics",
    title: "Portics",
    descriptionKey: "projects.items.portics.description",
    techStack: ["Laravel", "Bootstrap", "JavaScript"],
    demoUrl: "https://portics.com.mx/",
  },
];
