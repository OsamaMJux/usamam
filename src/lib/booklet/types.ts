export type PageType =
  | "cover"
  | "welcome"
  | "about"
  | "mission"
  | "usp"
  | "services"
  | "branding-kit"
  | "social-kit"
  | "process"
  | "portfolio"
  | "team"
  | "testimonials"
  | "contact"
  | "client-welcome"
  | "kickoff"
  | "invoice"
  | "agreement"
  | "thankyou";

export interface Theme {
  primary: string;       // hex
  secondary: string;     // hex
  accent: string;        // hex
  background: string;    // hex
  text: string;          // hex
  headingFont: string;
  bodyFont: string;
  logoUrl?: string;
  heroImageUrl?: string;
}

export interface ServiceItem { title: string; description: string; icon?: string; }
export interface ProcessStep { title: string; description: string; }
export interface PortfolioItem { title: string; description: string; image?: string; }
export interface TeamMember { name: string; role: string; photo?: string; bio?: string; }
export interface Testimonial { quote: string; author: string; role?: string; rating?: number; }
export interface InvoiceItem { service: string; description: string; amount: number; }

export interface Page {
  id: string;
  type: PageType;
  title: string;
  content: Record<string, any>;
}

export interface Booklet {
  id: string;
  companyName: string;
  tagline: string;
  industry?: string;
  websiteUrl: string;
  theme: Theme;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
}

export const PAGE_LABELS: Record<PageType, string> = {
  cover: "Cover",
  welcome: "Welcome",
  about: "About Us",
  mission: "Mission & Vision",
  usp: "USP",
  services: "Services",
  "branding-kit": "Branding Kit",
  "social-kit": "Social Media Kit",
  process: "Process",
  portfolio: "Portfolio",
  team: "Team",
  testimonials: "Testimonials",
  contact: "Contact",
  "client-welcome": "Client Welcome",
  kickoff: "Kickoff Meeting",
  invoice: "Invoice",
  agreement: "Agreement",
  thankyou: "Thank You",
};
