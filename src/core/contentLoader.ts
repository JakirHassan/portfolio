import compiledData from '../data/compiledContent.json';

export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface ResumeItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  glowColor: string;
  technologies: string[];
  content: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

export interface SectionConfig {
  id: string;
  type: 'hero' | 'case-studies' | 'skills' | 'experience' | 'articles' | 'contact';
  visible: boolean;
  title?: string;
  subtitle?: string;
  customProps?: Record<string, any>;
}

export interface ContentDatabase {
  profile: Profile;
  layout: SectionConfig[];
  resume: ResumeItem[];
  caseStudies: CaseStudy[];
  articles: Article[];
  compiledAt: string;
}

const db = compiledData as ContentDatabase;

export const contentLoader = {
  getProfile: (): Profile => db.profile,
  getLayout: (): SectionConfig[] => db.layout,
  getResume: (): ResumeItem[] => db.resume,
  getCaseStudies: (): CaseStudy[] => db.caseStudies,
  getArticles: (): Article[] => db.articles,
  getCompiledAt: (): string => db.compiledAt
};
