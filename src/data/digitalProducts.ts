import { Calendar, Grid3X3, Sparkles, Play, Zap } from "lucide-react";

export interface ProductBundle {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ProductTestimonial {
  name: string;
  title: string;
  content: string;
  image?: string;
  metric?: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface DigitalProduct {
  id: string;
  slug: string;
  icon: typeof Calendar;
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImage: string;
  price: string;
  originalPrice?: string;
  trustBadge: string;
  benefits: string[];
  bundles: ProductBundle[];
  comparisonTable: {
    features: string[];
    starter: (string | boolean)[];
    growth: (string | boolean)[];
    premium: (string | boolean)[];
  };
  scarcity: {
    text: string;
    remaining: number;
    total: number;
  };
  testimonials: ProductTestimonial[];
  faqs: ProductFAQ[];
  popular?: boolean;
}

export const digitalProducts: DigitalProduct[] = [
  {
    id: "content-calendar",
    slug: "content-calendar",
    icon: Calendar,
    title: "Content Calendar Templates",
    headline: "Never Run Out of Content Ideas Again",
    subheadline: "30+ shareable & relatable content templates that helped creators grow 10x faster. Used by 500+ entrepreneurs worldwide.",
    description: "A comprehensive content planning system with 30+ proven templates, organized by theme, platform, and content type. Stop staring at a blank screen and start creating content that resonates.",
    heroImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80",
    price: "$49",
    originalPrice: "$99",
    trustBadge: "Trusted by 500+ creators & entrepreneurs",
    benefits: [
      "Save 10+ hours per week on content planning",
      "Never run out of engaging content ideas",
      "Proven templates that drive real engagement",
      "Organized by niche, platform & content type",
      "Instant download - start creating today"
    ],
    bundles: [
      {
        name: "Starter",
        price: "$29",
        description: "Perfect for beginners",
        features: ["15 Content Templates", "Monthly Calendar View", "Basic Hashtag Guide", "Email Support"]
      },
      {
        name: "Growth",
        price: "$49",
        description: "Most popular choice",
        features: ["30+ Content Templates", "Weekly & Monthly Calendars", "Hashtag Research Database", "Content Pillars Framework", "Priority Support"],
        popular: true
      },
      {
        name: "Premium",
        price: "$99",
        description: "Complete content arsenal",
        features: ["50+ Content Templates", "Full Year Planning System", "AI Prompt Templates", "Caption Templates", "1-on-1 Strategy Call", "Lifetime Updates"]
      }
    ],
    comparisonTable: {
      features: ["Content Templates", "Calendar Views", "Hashtag Database", "Content Pillars", "AI Prompts", "Caption Templates", "Strategy Call", "Lifetime Updates", "Price"],
      starter: ["15", "Monthly", false, false, false, false, false, false, "$29"],
      growth: ["30+", "Weekly & Monthly", true, true, false, false, false, false, "$49"],
      premium: ["50+", "Full Year", true, true, true, true, true, true, "$99"]
    },
    scarcity: {
      text: "Limited slots available this week",
      remaining: 7,
      total: 20
    },
    testimonials: [
      {
        name: "Sarah Chen",
        title: "Content Creator, 50K followers",
        content: "This calendar literally changed my life. I went from posting randomly to having a month of content ready in one sitting.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        metric: "3x engagement increase"
      },
      {
        name: "Marcus Johnson",
        title: "E-commerce Entrepreneur",
        content: "Finally, a system that actually works. My content is more consistent, and my audience has grown 40% in just 2 months.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        metric: "40% audience growth"
      },
      {
        name: "Priya Sharma",
        title: "Digital Marketing Coach",
        content: "I recommend this to all my clients. The templates are thoughtful, relevant, and actually drive conversations.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
        metric: "500+ students use it"
      }
    ],
    faqs: [
      {
        question: "What format are the templates in?",
        answer: "All templates come in Notion, Google Sheets, and PDF formats so you can use whichever platform you prefer."
      },
      {
        question: "Are these templates niche-specific?",
        answer: "The templates are designed to be adaptable across any niche. We include examples for lifestyle, business, fitness, and more."
      },
      {
        question: "Do I get lifetime access?",
        answer: "Yes! Once you purchase, you get lifetime access including all future updates."
      },
      {
        question: "What if it doesn't work for me?",
        answer: "We offer a 30-day money-back guarantee. If you're not satisfied, just message us for a full refund."
      }
    ]
  },
  {
    id: "instagram-grids",
    slug: "instagram-grids",
    icon: Grid3X3,
    title: "Instagram Grid System",
    headline: "Turn Your Profile Into a Visual Masterpiece",
    subheadline: "The exact grid templates that helped brands achieve 200K+ followers with a cohesive, scroll-stopping feed.",
    description: "A complete visual system for creating Instagram feeds that look like they were designed by a professional. Includes grid layouts, color schemes, and posting patterns.",
    heroImage: "https://images.unsplash.com/photo-1718251471632-17a66c582e69?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$79",
    originalPrice: "$149",
    trustBadge: "Used by 300+ brands & influencers",
    popular: true,
    benefits: [
      "Create a cohesive feed that stops the scroll",
      "Pre-designed grid patterns for any niche",
      "Color palette generators included",
      "Works with Canva, Photoshop, or Figma",
      "Stand out from 95% of other accounts"
    ],
    bundles: [
      {
        name: "Starter",
        price: "$49",
        description: "Essential grids",
        features: ["5 Grid Templates", "Basic Color Palettes", "Canva Compatible", "Email Support"]
      },
      {
        name: "Growth",
        price: "$79",
        description: "Complete system",
        features: ["15 Grid Templates", "Custom Color Generator", "All Platform Formats", "Story Templates", "Priority Support"],
        popular: true
      },
      {
        name: "Premium",
        price: "$149",
        description: "Agency-level assets",
        features: ["30 Grid Templates", "Brand Kit Builder", "Highlight Covers", "Reels Thumbnails", "Feed Audit Checklist", "1-on-1 Review Call"]
      }
    ],
    comparisonTable: {
      features: ["Grid Templates", "Color Palettes", "Story Templates", "Highlight Covers", "Reels Thumbnails", "Brand Kit", "Feed Audit", "Review Call", "Price"],
      starter: ["5", "Basic", false, false, false, false, false, false, "$49"],
      growth: ["15", "Custom Generator", true, false, false, false, false, false, "$79"],
      premium: ["30", "Full Brand Kit", true, true, true, true, true, true, "$149"]
    },
    scarcity: {
      text: "Download slots reset weekly",
      remaining: 12,
      total: 30
    },
    testimonials: [
      {
        name: "Emma Rodriguez",
        title: "Lifestyle Blogger, 120K followers",
        content: "My feed went from chaotic to magazine-worthy overnight. The templates are incredibly easy to customize.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        metric: "120K followers reached"
      },
      {
        name: "David Park",
        title: "Brand Strategist",
        content: "I use these for all my client projects. The quality rivals what agencies charge thousands for.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
        metric: "Used for 50+ clients"
      },
      {
        name: "Lisa Thompson",
        title: "Small Business Owner",
        content: "As someone with zero design skills, this made my brand look professional instantly.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        metric: "2x store visits"
      }
    ],
    faqs: [
      {
        question: "Do I need design experience?",
        answer: "Not at all! The templates are drag-and-drop ready in Canva. If you can use PowerPoint, you can use these."
      },
      {
        question: "Can I customize the colors?",
        answer: "Absolutely! Every template is fully customizable. We even include a color palette generator."
      },
      {
        question: "What platforms are supported?",
        answer: "Templates work with Canva (free), Adobe Photoshop, and Figma. Choose your preferred tool."
      },
      {
        question: "How many Instagram posts can I create?",
        answer: "Unlimited! Once you have the templates, you can create as many posts as you want."
      }
    ]
  },
  {
    id: "ad-creatives",
    slug: "ad-creatives",
    icon: Sparkles,
    title: "High-Converting Ad Creatives",
    headline: "Ad Templates That Generated $2M+ in Revenue",
    subheadline: "Stop wasting money on ads that don't convert. Use the exact creative frameworks proven across 100+ campaigns.",
    description: "Battle-tested ad creative templates designed for Facebook, Instagram, TikTok, and Google Ads. Each template is backed by real campaign data and optimized for conversions.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    price: "$99",
    originalPrice: "$199",
    trustBadge: "$2M+ in client revenue generated",
    benefits: [
      "Proven templates from $2M+ in ad spend",
      "Works for Facebook, Instagram, TikTok & Google",
      "Swipe files with winning copy formulas",
      "Before/after examples included",
      "Save thousands on failed ad tests"
    ],
    bundles: [
      {
        name: "Starter",
        price: "$59",
        description: "Essential ads",
        features: ["10 Ad Templates", "Basic Copy Formulas", "Static Ads Only", "Email Support"]
      },
      {
        name: "Growth",
        price: "$99",
        description: "Full creative suite",
        features: ["25 Ad Templates", "Video Ad Scripts", "All Platforms", "A/B Test Framework", "Priority Support"],
        popular: true
      },
      {
        name: "Premium",
        price: "$199",
        description: "Agency arsenal",
        features: ["50+ Ad Templates", "Campaign Blueprints", "Audience Targeting Guide", "Creative Brief Template", "Monthly Updates", "Strategy Call"]
      }
    ],
    comparisonTable: {
      features: ["Ad Templates", "Copy Formulas", "Video Scripts", "Campaign Blueprints", "A/B Framework", "Targeting Guide", "Monthly Updates", "Strategy Call", "Price"],
      starter: ["10", "Basic", false, false, false, false, false, false, "$59"],
      growth: ["25", "Advanced", true, false, true, false, false, false, "$99"],
      premium: ["50+", "Complete Library", true, true, true, true, true, true, "$199"]
    },
    scarcity: {
      text: "Limited access to prevent market saturation",
      remaining: 5,
      total: 15
    },
    testimonials: [
      {
        name: "Alex Kim",
        title: "DTC Brand Founder",
        content: "These templates cut our cost per acquisition in half. We went from $40 CPA to $18 in the first week.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
        metric: "55% lower CPA"
      },
      {
        name: "Jennifer Walsh",
        title: "Marketing Agency Owner",
        content: "Finally, ad templates that actually work. My team saves hours every week, and results have never been better.",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
        metric: "4x ROAS achieved"
      },
      {
        name: "Ryan Costa",
        title: "E-commerce Manager",
        content: "Worth every penny. We 10x'd our ad creative output without hiring another designer.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
        metric: "$500K revenue month"
      }
    ],
    faqs: [
      {
        question: "What ad platforms do these work for?",
        answer: "The templates are optimized for Facebook, Instagram, TikTok, and Google Display ads."
      },
      {
        question: "Do you include video ad templates?",
        answer: "Yes! The Growth and Premium bundles include video ad scripts and storyboard templates."
      },
      {
        question: "Are these just for e-commerce?",
        answer: "No, we have templates for e-commerce, SaaS, services, and lead generation businesses."
      },
      {
        question: "Will these become outdated?",
        answer: "The Premium tier includes monthly updates as ad trends evolve. Core principles stay relevant."
      }
    ]
  },
  {
    id: "viral-reels",
    slug: "viral-reels",
    icon: Play,
    title: "Viral Reels Framework",
    headline: "The Blueprint Behind 10M+ Views",
    subheadline: "Stop guessing what goes viral. Use the exact framework that consistently generates millions of views.",
    description: "A complete system for creating viral short-form video content. Includes hook formulas, trending audio strategies, editing templates, and content calendars specifically for Reels and TikTok.",
    heroImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=80",
    price: "$69",
    originalPrice: "$129",
    trustBadge: "10M+ views generated",
    benefits: [
      "Hook formulas that stop the scroll in 0.5 seconds",
      "Trending audio discovery strategies",
      "Editing templates for CapCut & Premiere",
      "30-day viral content calendar included",
      "Works for any niche or industry"
    ],
    bundles: [
      {
        name: "Starter",
        price: "$39",
        description: "Viral basics",
        features: ["10 Hook Formulas", "Basic Editing Templates", "Audio Strategy Guide", "Email Support"]
      },
      {
        name: "Growth",
        price: "$69",
        description: "Complete framework",
        features: ["25 Hook Formulas", "Advanced Editing Presets", "Trend Tracking System", "30-Day Calendar", "Priority Support"],
        popular: true
      },
      {
        name: "Premium",
        price: "$129",
        description: "Viral mastery",
        features: ["50+ Hook Formulas", "Done-For-You Scripts", "Monetization Playbook", "Weekly Trend Updates", "Private Community", "Monthly Coaching Call"]
      }
    ],
    comparisonTable: {
      features: ["Hook Formulas", "Editing Templates", "Audio Strategy", "Content Calendar", "Trend Updates", "Scripts", "Community Access", "Coaching", "Price"],
      starter: ["10", "Basic", true, false, false, false, false, false, "$39"],
      growth: ["25", "Advanced", true, true, false, false, false, false, "$69"],
      premium: ["50+", "Full Library", true, true, true, true, true, true, "$129"]
    },
    scarcity: {
      text: "Spots fill up fast each week",
      remaining: 9,
      total: 25
    },
    testimonials: [
      {
        name: "Mia Roberts",
        title: "Content Creator, 500K followers",
        content: "My first Reel using this framework hit 2.3 million views. I've never looked back.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        metric: "2.3M views on first reel"
      },
      {
        name: "Chris Patterson",
        title: "Fitness Coach",
        content: "I went from 5K to 100K followers in 3 months just by applying these hook formulas.",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&q=80",
        metric: "95K followers gained"
      },
      {
        name: "Nina Patel",
        title: "Business Coach",
        content: "The trend tracking system alone is worth the price. I'm always ahead of what's about to blow up.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
        metric: "8M+ total views"
      }
    ],
    faqs: [
      {
        question: "Do I need expensive equipment?",
        answer: "No! Most of our viral examples were filmed on smartphones. It's about the content, not the camera."
      },
      {
        question: "Does this work for TikTok too?",
        answer: "Absolutely. The framework works for Instagram Reels, TikTok, YouTube Shorts, and any short-form platform."
      },
      {
        question: "How quickly can I see results?",
        answer: "Many customers see their first viral video within 2-4 weeks of implementing the framework."
      },
      {
        question: "I'm in a 'boring' niche. Will this work?",
        answer: "Yes! We have case studies from finance, B2B, legal, and other 'boring' niches going viral."
      }
    ]
  },
  {
    id: "viral-posts",
    slug: "viral-posts",
    icon: Zap,
    title: "Viral Posts Playbook",
    headline: "Turn Every Post Into a Potential Viral Hit",
    subheadline: "The psychology and frameworks behind posts that get shared, saved, and remembered.",
    description: "A complete playbook for creating text-based and carousel posts that go viral on LinkedIn, Twitter, and Instagram. Includes swipe files, templates, and psychological triggers.",
    heroImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
    price: "$59",
    originalPrice: "$99",
    trustBadge: "1M+ impressions generated",
    benefits: [
      "Psychology-backed post formulas",
      "50+ swipe-worthy post templates",
      "Carousel design templates included",
      "Best times to post analysis",
      "Engagement hacks that actually work"
    ],
    bundles: [
      {
        name: "Starter",
        price: "$29",
        description: "Post essentials",
        features: ["15 Post Templates", "Basic Formulas", "Timing Guide", "Email Support"]
      },
      {
        name: "Growth",
        price: "$59",
        description: "Full playbook",
        features: ["50+ Post Templates", "Carousel Templates", "Psychology Framework", "Engagement Scripts", "Priority Support"],
        popular: true
      },
      {
        name: "Premium",
        price: "$99",
        description: "Viral authority",
        features: ["100+ Templates", "Personal Branding Guide", "Thought Leadership System", "Weekly Prompts", "Private Community", "Quarterly Strategy Call"]
      }
    ],
    comparisonTable: {
      features: ["Post Templates", "Carousel Designs", "Psychology Framework", "Timing Analysis", "Engagement Scripts", "Personal Branding", "Community", "Strategy Calls", "Price"],
      starter: ["15", false, false, true, false, false, false, false, "$29"],
      growth: ["50+", true, true, true, true, false, false, false, "$59"],
      premium: ["100+", true, true, true, true, true, true, true, "$99"]
    },
    scarcity: {
      text: "Weekly download limit",
      remaining: 15,
      total: 40
    },
    testimonials: [
      {
        name: "Jordan Lee",
        title: "LinkedIn Top Voice",
        content: "I went from 2K to 25K LinkedIn followers using these exact frameworks. Game changer.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
        metric: "25K LinkedIn followers"
      },
      {
        name: "Aisha Mohammed",
        title: "Startup Founder",
        content: "My carousel posts consistently hit 100K+ impressions now. The templates are gold.",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&q=80",
        metric: "100K+ impressions"
      },
      {
        name: "Tom Bradley",
        title: "Sales Coach",
        content: "The psychology framework completely changed how I write. Every post now has intent and impact.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        metric: "3x lead generation"
      }
    ],
    faqs: [
      {
        question: "Which platforms does this work for?",
        answer: "The playbook covers LinkedIn, Twitter/X, Instagram carousels, and Facebook. Principles apply everywhere."
      },
      {
        question: "Are the carousel templates included?",
        answer: "Yes! Growth and Premium tiers include fully designed carousel templates for Canva."
      },
      {
        question: "How is this different from other post templates?",
        answer: "We focus on the psychology of virality, not just formats. You'll understand WHY things go viral."
      },
      {
        question: "Can I use these for my clients?",
        answer: "Personal license covers your own use. Contact us for agency/commercial licensing options."
      }
    ]
  }
];

export const getProductBySlug = (slug: string): DigitalProduct | undefined => {
  return digitalProducts.find(product => product.slug === slug);
};
