import { Booklet, Page, Theme, PageType } from "./types";

export const PRESET_THEMES: Record<string, Theme> = {
  corporate: {
    primary: "#1e3a8a", secondary: "#3b82f6", accent: "#f59e0b",
    background: "#ffffff", text: "#0f172a",
    headingFont: "Inter", bodyFont: "Inter",
  },
  luxury: {
    primary: "#0c0c0c", secondary: "#c9a04a", accent: "#c9a04a",
    background: "#0c0c0c", text: "#f5efe0",
    headingFont: "Playfair Display", bodyFont: "Inter",
  },
  modern: {
    primary: "#111827", secondary: "#6366f1", accent: "#10b981",
    background: "#fafafa", text: "#111827",
    headingFont: "Space Grotesk", bodyFont: "Inter",
  },
  creative: {
    primary: "#ec4899", secondary: "#8b5cf6", accent: "#f59e0b",
    background: "#fff7ed", text: "#1f2937",
    headingFont: "Syne", bodyFont: "DM Sans",
  },
  tech: {
    primary: "#06b6d4", secondary: "#0ea5e9", accent: "#a78bfa",
    background: "#0b1220", text: "#e2e8f0",
    headingFont: "JetBrains Mono", bodyFont: "Inter",
  },
  minimal: {
    primary: "#000000", secondary: "#525252", accent: "#000000",
    background: "#ffffff", text: "#171717",
    headingFont: "Inter", bodyFont: "Inter",
  },
};

const uid = () => Math.random().toString(36).slice(2, 10);

export function buildDefaultPages(data: Partial<Booklet>): Page[] {
  const c = data.companyName || "Your Company";
  return [
    { id: uid(), type: "cover", title: "Cover", content: { tagline: data.tagline || "Excellence in every detail", year: new Date().getFullYear() } },
    { id: uid(), type: "welcome", title: "Welcome", content: { message: `Welcome to ${c}. We're thrilled to partner with you on a journey of creativity, strategy, and measurable impact.` } },
    { id: uid(), type: "about", title: "About Us", content: { overview: `${c} is a forward-thinking team dedicated to delivering exceptional work.`, history: "Founded with a passion for craft and outcomes.", values: ["Integrity", "Excellence", "Innovation", "Partnership"] } },
    { id: uid(), type: "mission", title: "Mission & Vision", content: { mission: "Empower brands to achieve their highest potential through strategic creativity.", vision: "To become the most trusted creative partner for ambitious companies worldwide." } },
    { id: uid(), type: "services", title: "Services", content: { items: [
      { title: "Branding", description: "Identity systems that resonate." },
      { title: "Web Development", description: "Performant, beautiful websites." },
      { title: "SEO", description: "Rank higher and convert better." },
      { title: "Social Media", description: "Content that drives engagement." },
      { title: "Content Creation", description: "Stories that connect." },
      { title: "Advertising", description: "Campaigns that deliver ROI." },
    ] } },
    { id: uid(), type: "process", title: "Process", content: { steps: [
      { title: "Discover", description: "Understand your goals, audience, and market." },
      { title: "Define", description: "Shape strategy, scope, and success metrics." },
      { title: "Design", description: "Craft solutions with precision and beauty." },
      { title: "Deliver", description: "Launch, measure, and iterate." },
    ] } },
    { id: uid(), type: "portfolio", title: "Portfolio", content: { items: [
      { title: "Project Alpha", description: "Brand refresh for a Series-B SaaS." },
      { title: "Project Beta", description: "E-commerce rebuild, +40% conversion." },
      { title: "Project Gamma", description: "Launch campaign, 2M+ impressions." },
    ] } },
    { id: uid(), type: "team", title: "Team", content: { members: [
      { name: "Founder", role: "Creative Director", bio: "Leads strategy and design." },
      { name: "Lead Designer", role: "Brand & UI", bio: "Identity and product systems." },
      { name: "Tech Lead", role: "Engineering", bio: "Architecture and delivery." },
    ] } },
    { id: uid(), type: "testimonials", title: "Testimonials", content: { items: [
      { quote: "They transformed our brand and our business.", author: "Client A", role: "CEO", rating: 5 },
      { quote: "Best partner we've worked with. Period.", author: "Client B", role: "CMO", rating: 5 },
    ] } },
    { id: uid(), type: "contact", title: "Contact", content: { email: "hello@company.com", phone: "+1 (555) 000-0000", website: data.websiteUrl || "https://yourcompany.com", address: "Your City, Country", socials: { linkedin: "", instagram: "", twitter: "" } } },
    { id: uid(), type: "client-welcome", title: "Client Welcome", content: {
      welcome: "We're excited to begin this engagement.",
      expect: ["Clear Project Roadmap", "Regular Communication", "Transparent Deliverables", "Timely Updates", "Strategic Guidance"],
      needFromYou: ["Brand Assets", "Access Credentials", "Requirements Brief", "Feedback Loop", "Approval Contacts"],
      channels: ["Email", "WhatsApp", "Zoom", "Google Meet"],
    } },
    { id: uid(), type: "kickoff", title: "Kickoff Meeting", content: {
      services: ["Branding", "Website Development", "SEO", "Social Media", "Content Creation", "Advertising"],
      purpose: ["Goals Alignment", "Objectives Setting", "KPIs Definition", "Timeline Confirmation"],
      agenda: ["Introductions", "Business Overview", "Goals & Vision", "Target Audience", "Project Timeline", "Open Questions"],
    } },
    { id: uid(), type: "invoice", title: "Invoice", content: {
      invoiceNumber: "INV-001", transactionId: "—", dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      paymentMethod: "Bank Transfer",
      items: [
        { service: "Brand Identity", description: "Complete identity system", amount: 4500 },
        { service: "Website", description: "Design + development", amount: 8500 },
      ],
      taxRate: 0.05,
    } },
    { id: uid(), type: "agreement", title: "Agreement", content: {
      agencyName: c, agencyAddress: "Your Address",
      clientName: "Client Company", clientAddress: "Client Address",
      effectiveDate: new Date().toISOString().slice(0, 10),
      clauses: [
        "The Contractor is engaged as an independent contractor and not as an employee.",
        "All deliverables become property of the Client upon final payment.",
        "Either party may terminate this agreement with 14 days written notice.",
        "Confidentiality applies to all shared business information.",
      ],
    } },
    { id: uid(), type: "thankyou", title: "Thank You", content: {
      message: "Thank you for choosing us. Let's build something exceptional together.",
      cta: "Let's Build Something Exceptional Together",
    } },
  ];
}

export function createBooklet(input: { websiteUrl: string; companyName?: string; industry?: string; tagline?: string; theme?: Theme; pages?: Page[] }): Booklet {
  const theme: Theme = input.theme || PRESET_THEMES.modern;
  const partial: Partial<Booklet> = {
    websiteUrl: input.websiteUrl,
    companyName: input.companyName || "Your Company",
    tagline: input.tagline || "Excellence in every detail",
    industry: input.industry,
  };
  return {
    id: uid(),
    companyName: partial.companyName!,
    tagline: partial.tagline!,
    industry: partial.industry,
    websiteUrl: partial.websiteUrl!,
    theme,
    pages: input.pages && input.pages.length ? input.pages : buildDefaultPages(partial),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const STORAGE_KEY = "booklet:current";
