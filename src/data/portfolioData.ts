export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  glowColor: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'strategy' | 'analytics' | 'technical';
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    subTitle: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Jakir Hassan",
    title: "Senior Product Manager | Growth & Platform",
    subTitle: "Scaling digital products, user acquisition loops, and API infrastructures using data-driven insights and rigorous user research.",
    bio: "I specialize in leading cross-functional teams to build fintech ecosystems, developer platforms, and SaaS activation channels. By merging technical design patterns with behavioral economics, I design and ship high-retention features that drive business metrics.",
    email: "jakirhassan@example.com",
    github: "https://github.com/JakirHassan",
    linkedin: "https://linkedin.com/in/jakirhassan",
    twitter: "https://twitter.com/jakirhassan"
  },
  skills: [
    // Strategy & Growth
    { name: "Product Strategy & OKRs", level: 95, category: "strategy" },
    { name: "A/B Testing & Experimentation", level: 92, category: "strategy" },
    { name: "User Retention & Growth Loops", level: 90, category: "strategy" },
    { name: "Roadmapping & Prioritization", level: 95, category: "strategy" },
    { name: "User Research & Journey Mapping", level: 88, category: "strategy" },
    
    // Analytics & Data
    { name: "Product Analytics (Amplitude/Mixpanel)", level: 92, category: "analytics" },
    { name: "SQL Data Querying", level: 85, category: "analytics" },
    { name: "Metrics Dashboarding (Tableau)", level: 80, category: "analytics" },
    { name: "Market & Competitive Analysis", level: 85, category: "analytics" },

    // Technical & Delivery
    { name: "API Design & Technical Spec Writing", level: 88, category: "technical" },
    { name: "UI/UX Wireframing (Figma)", level: 82, category: "technical" },
    { name: "Agile & Scrum Leadership", level: 94, category: "technical" },
    { name: "SDLC & Software Engineering Basics", level: 80, category: "technical" }
  ],
  projects: [
    {
      id: "project-1",
      title: "Onboarding Conversion Funnel Overhaul",
      category: "Growth Product Management",
      description: "Led a growth squad to re-engineer the user activation funnel, increasing sign-up conversion rate by 28%.",
      longDescription: "Analyzed user drops in the checkout and setup process using Amplitude. Formulated hypotheses and ran a series of A/B tests implementing frictionless authentication, progress indicators, and personalized landing states. Successfully boosted user activation (sign-up to first key action) by 28% and reduced onboarding time-to-value from 12 minutes to under 3 minutes.",
      technologies: ["A/B Testing", "Amplitude", "Figma Wireframing", "Behavioral Economics"],
      liveUrl: "https://github.com/JakirHassan",
      githubUrl: "https://github.com/JakirHassan",
      glowColor: "rgba(0, 255, 170, 0.4)" // Mint Green
    },
    {
      id: "project-2",
      title: "Developer API Platform Re-architecture",
      category: "Platform Product Management",
      description: "Overhauled merchant onboarding APIs, reducing payment integration cycle times from 14 days to 2 days.",
      longDescription: "Conducted interviews with merchant developers to map out friction points in integrating FinFlow's payment systems. Authored technical product specifications (PRDs) to deprecate legacy SOAP endpoints in favor of a RESTful Webhook framework. Partnered with engineering to build an interactive Developer Sandbox and SDK documentation portal, reducing integration support tickets by 60%.",
      technologies: ["RESTful APIs", "Technical PRDs", "Developer UX", "OpenAPI Spec"],
      liveUrl: "https://github.com/JakirHassan",
      githubUrl: "https://github.com/JakirHassan",
      glowColor: "rgba(170, 59, 255, 0.4)" // Neon Purple
    },
    {
      id: "project-3",
      title: "Self-Serve Business Analytics Module",
      category: "SaaS Product Management",
      description: "Shipped a real-time data visualization portal for B2B merchants, driving active usage retention by 18%.",
      longDescription: "Collaborated with sales and customer success teams to identify key reporting needs for enterprise accounts. Designed and managed the delivery of a self-serve reporting dashboard utilizing modular widgets. Users can track transaction volume, customer lifetime value, and churn rates in real-time. Boosted account retention of B2B partners by 18% over two quarters.",
      technologies: ["SQL analytics", "B2B SaaS Strategy", "Mixpanel", "Mockups & Wireframes"],
      liveUrl: "https://github.com/JakirHassan",
      githubUrl: "https://github.com/JakirHassan",
      glowColor: "rgba(0, 180, 255, 0.4)" // Cyan
    }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Lead Product Manager - Platform & Integration",
      company: "FinFlow Systems",
      location: "San Francisco, CA (Hybrid)",
      duration: "2024 - Present",
      description: [
        "Owning the product roadmap and execution for API gateways and developer onboarding channels, scaling integrations to over 5,000 active merchant profiles.",
        "Establishing platform performance metrics and cross-functional API versioning policies to ensure backwards compatibility.",
        "Collaborating with engineering leaders to reduce API response latency by 200ms, improving platform merchant retention."
      ]
    },
    {
      id: "exp-2",
      role: "Senior Product Manager - Growth",
      company: "ScaleCorp Technology",
      location: "New York, NY",
      duration: "2021 - 2024",
      description: [
        "Led a squad of 8 engineers and designers focused on user acquisition and funnel conversion optimization.",
        "Designed and shipped 30+ growth experiments, increasing annual recurring revenue (ARR) from new cohorts by $2.4M.",
        "Implemented rigorous product discovery frameworks, resulting in a 35% improvement in feature adoption rates post-release."
      ]
    }
  ]
};
