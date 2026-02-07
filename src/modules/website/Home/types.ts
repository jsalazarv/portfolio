import type { ReactNode } from "react";

export interface Profile {
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface Interest {
  icon: ReactNode;
  label: string;
}

export interface Experience {
  title: string;
  role: string;
  period: string;
  points: string[];
}

export interface Education {
  title: string;
  subtitle: string;
  location: string;
  period: string;
}

export interface Tool {
  color: string;
  text: string;
}

export interface SkillSection {
  title: string;
  tools?: Tool[];
  languages?: string[];
  customElement?: ReactNode;
}

export interface PortfolioLink {
  icon: ReactNode;
  label: string;
  url?: string;
}

export interface Detail {
  icon: ReactNode;
  label: string;
}
