export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseSnapshot {
  industry: string;
  platform: string;
  timeline: string;
  tools: string[];
  role: string;
  teamSize: string;
}

export interface ProblemGoals {
  userProblems: string[];
  businessChallenges: string[];
  businessGoals: string[];
  userGoals: string[];
  successMetrics: string[];
}

export interface Research {
  methods: string[];
  insights: string[];
}

export interface Strategy {
  uxPrinciples: string[];
  designApproach: string[];
}

export interface UserFlow {
  keyFlows: string[];
  structuralImprovements: string[];
}

export interface DesignProcess {
  wireframes: string[];
  uiDirection: string[];
  accessibility: string[];
}

export interface FinalSolution {
  screens: string[];
  keyFeatures: string[];
  uxImprovements: string[];
}

export interface Results {
  metrics: CaseStudyMetric[];
  impact: string[];
}

export interface Learnings {
  whatWorked: string[];
  whatToImprove: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  outcomeStatement: string;
  heroImage: string;
  heroMetrics: CaseStudyMetric[];
  snapshot: CaseSnapshot;
  problem: {
    userProblems: string[];
    businessChallenges: string[];
  };
  goals: {
    businessGoals: string[];
    userGoals: string[];
    successMetrics: string[];
  };
  myRole: {
    responsibilities: string[];
    ownershipLevel: string;
  };
  research: Research;
  strategy: Strategy;
  userFlow: UserFlow;
  designProcess: DesignProcess;
  finalSolution: FinalSolution;
  results: Results;
  learnings: Learnings;
  nextSteps: string[];
  nextCaseStudy?: {
    slug: string;
    title: string;
    image: string;
  };
}

// Case studies based on Behance projects
export const caseStudies: CaseStudy[] = [
  {
    id: "nourishhubs",
    slug: "nourishhubs",
    title: "NourishHubs",
    client: "NourishHubs",
    category: "Health & Wellness",
    outcomeStatement: "Increased user engagement by 180% through intuitive meal planning experience",
    heroImage: "https://mir-s3-cdn-cf.behance.net/projects/404/4b248e215502141.Y3JvcCwyNjA2LDIwMzksMjI1LDA.png",
    heroMetrics: [
      { value: "180%", label: "Engagement Increase" },
      { value: "4.8", label: "App Store Rating" },
      { value: "50K+", label: "Active Users" },
      { value: "35%", label: "Retention Boost" },
    ],
    snapshot: {
      industry: "Health & Wellness",
      platform: "iOS & Android",
      timeline: "12 weeks",
      tools: ["Figma", "Principle", "Maze", "Hotjar"],
      role: "Lead Product Designer",
      teamSize: "5 members",
    },
    problem: {
      userProblems: [
        "Users struggled to find healthy meal options quickly",
        "Complex nutrition tracking led to app abandonment",
        "Lack of personalization made recommendations irrelevant",
        "Poor onboarding caused 60% drop-off in first week",
      ],
      businessChallenges: [
        "Low conversion from free to premium users",
        "High customer acquisition costs",
        "Negative app store reviews affecting downloads",
        "Competitor apps gaining market share",
      ],
    },
    goals: {
      businessGoals: [
        "Increase premium conversion rate by 40%",
        "Reduce customer support tickets by 50%",
        "Improve app store rating to 4.5+",
        "Increase monthly active users by 100K",
      ],
      userGoals: [
        "Find healthy meals in under 30 seconds",
        "Track nutrition without manual data entry",
        "Get personalized recommendations based on dietary needs",
        "Share meal plans with family members",
      ],
      successMetrics: [
        "Time to first meal selection < 2 minutes",
        "Daily active user retention > 40%",
        "Premium conversion rate > 8%",
        "NPS score > 50",
      ],
    },
    myRole: {
      responsibilities: [
        "Led end-to-end design from research to handoff",
        "Conducted user interviews and usability testing",
        "Created design system and component library",
        "Collaborated with engineering on implementation",
        "Presented design decisions to stakeholders",
      ],
      ownershipLevel: "Full ownership of UX/UI design with direct stakeholder communication",
    },
    research: {
      methods: [
        "20 user interviews with target demographic",
        "Competitive analysis of 8 similar apps",
        "Survey of 500+ potential users",
        "Heuristic evaluation of existing app",
        "Analytics review of user behavior patterns",
      ],
      insights: [
        "78% of users abandon nutrition apps due to complexity",
        "Users prefer visual meal representation over calorie numbers",
        "Personalization is the #1 requested feature",
        "Social features increase retention by 3x",
        "Morning is peak usage time for meal planning",
      ],
    },
    strategy: {
      uxPrinciples: [
        "Progressive disclosure to reduce cognitive load",
        "Visual-first approach for meal selection",
        "Smart defaults based on user preferences",
        "Gamification for habit formation",
      ],
      designApproach: [
        "Mobile-first responsive design",
        "Card-based UI for scannable content",
        "Warm, inviting color palette for food imagery",
        "Microinteractions for delightful feedback",
      ],
    },
    userFlow: {
      keyFlows: [
        "Onboarding: 5-step personalization wizard",
        "Meal Discovery: Browse → Filter → Select → Add to Plan",
        "Nutrition Tracking: Auto-log with photo recognition",
        "Social Sharing: One-tap share to family group",
      ],
      structuralImprovements: [
        "Reduced onboarding from 12 steps to 5",
        "Added smart search with dietary filter presets",
        "Implemented bottom navigation for key actions",
        "Created dedicated 'Quick Add' flow for repeat meals",
      ],
    },
    designProcess: {
      wireframes: [
        "Low-fidelity sketches exploring 3 navigation patterns",
        "Mid-fidelity wireframes for 15 key screens",
        "Interactive prototype for usability testing",
        "Iterated based on 3 rounds of user feedback",
      ],
      uiDirection: [
        "Warm gradient backgrounds suggesting freshness",
        "High-contrast food photography with subtle shadows",
        "Rounded corners and soft UI for approachability",
        "Custom illustrations for empty states",
      ],
      accessibility: [
        "WCAG AA compliant color contrast ratios",
        "Screen reader optimized with proper ARIA labels",
        "Touch targets minimum 44x44px",
        "Reduced motion support for animations",
        "High contrast mode for low vision users",
      ],
    },
    finalSolution: {
      screens: [
        "Personalized home dashboard with meal suggestions",
        "Visual meal discovery with smart filters",
        "Simplified nutrition tracker with weekly insights",
        "Family sharing hub with collaborative meal planning",
      ],
      keyFeatures: [
        "AI-powered meal recommendations based on preferences",
        "Photo-based nutrition logging with 95% accuracy",
        "Weekly meal prep planner with grocery list generation",
        "Social challenges and achievement system",
      ],
      uxImprovements: [
        "Reduced time to first action from 5 min to 45 sec",
        "Simplified navigation from 7 tabs to 4",
        "Added contextual help tooltips throughout",
        "Implemented skeleton loading for perceived performance",
      ],
    },
    results: {
      metrics: [
        { value: "180%", label: "Engagement Increase" },
        { value: "4.8★", label: "App Store Rating" },
        { value: "52%", label: "Premium Conversion" },
        { value: "35%", label: "Retention Improvement" },
      ],
      impact: [
        "Exceeded all initial success metrics within 3 months",
        "Featured in App Store 'Health & Fitness' collection",
        "Reduced support tickets by 65%",
        "Achieved product-market fit with strong NPS of 62",
      ],
    },
    learnings: {
      whatWorked: [
        "Early user involvement prevented costly pivots",
        "Progressive disclosure reduced cognitive overwhelm",
        "Visual-first approach resonated with target users",
        "Design system accelerated development by 40%",
      ],
      whatToImprove: [
        "Would conduct more guerrilla testing during wireframing",
        "Earlier collaboration with engineering on technical constraints",
        "More focus on edge cases in initial designs",
        "Better documentation for design handoff",
      ],
    },
    nextSteps: [
      "Implement AI-powered meal suggestions based on season and location",
      "Add social features for community recipe sharing",
      "Develop Apple Watch companion app for quick logging",
      "Expand to web platform for desktop meal planning",
    ],
    nextCaseStudy: {
      slug: "ascendables",
      title: "Ascendables Crowdfunding",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/1565b1173888175.Y3JvcCw1MTY1LDQwMzksMCww.png",
    },
  },
  {
    id: "ascendables",
    slug: "ascendables",
    title: "Ascendables Crowdfunding",
    client: "Ascendables",
    category: "FinTech / Crowdfunding",
    outcomeStatement: "Designed a trust-building crowdfunding platform that increased backer conversion by 65%",
    heroImage: "https://mir-s3-cdn-cf.behance.net/projects/404/1565b1173888175.Y3JvcCw1MTY1LDQwMzksMCww.png",
    heroMetrics: [
      { value: "65%", label: "Conversion Increase" },
      { value: "$2.1M", label: "Funds Raised" },
      { value: "12K+", label: "Backers" },
      { value: "4.9", label: "Trust Score" },
    ],
    snapshot: {
      industry: "FinTech / Crowdfunding",
      platform: "Web (Responsive)",
      timeline: "16 weeks",
      tools: ["Figma", "Framer", "Amplitude", "UserTesting"],
      role: "Senior UX Designer",
      teamSize: "8 members",
    },
    problem: {
      userProblems: [
        "Backers lacked confidence in project legitimacy",
        "Complex pledge process led to cart abandonment",
        "Difficult to track project updates and milestones",
        "No clear understanding of reward fulfillment timeline",
      ],
      businessChallenges: [
        "Lower conversion rates than industry average",
        "High bounce rate on project pages",
        "Creators struggling to reach funding goals",
        "Platform trust perception issues",
      ],
    },
    goals: {
      businessGoals: [
        "Increase pledge conversion rate by 50%",
        "Reduce project page bounce rate by 40%",
        "Improve creator success rate to 60%",
        "Build platform credibility and trust signals",
      ],
      userGoals: [
        "Quickly assess project credibility and team background",
        "Understand exactly what they're backing and when they'll receive it",
        "Track project progress with transparent updates",
        "Feel secure about their financial commitment",
      ],
      successMetrics: [
        "Pledge-to-visit ratio > 8%",
        "Project page time-on-page > 4 minutes",
        "Creator profile completion rate > 90%",
        "Backer satisfaction score > 4.5/5",
      ],
    },
    myRole: {
      responsibilities: [
        "Led UX research and strategy definition",
        "Designed trust-building UI patterns",
        "Created responsive component system",
        "Conducted A/B testing for key conversion points",
        "Worked with product team on feature prioritization",
      ],
      ownershipLevel: "Led design for backer experience and project discovery flows",
    },
    research: {
      methods: [
        "15 depth interviews with previous backers",
        "Heatmap and session recording analysis",
        "Competitive audit of 6 crowdfunding platforms",
        "Survey of 300+ crowdfunding participants",
        "Card sorting for information architecture",
      ],
      insights: [
        "65% of potential backers cite trust as primary concern",
        "Video content increases conversion by 80%",
        "Clear reward timelines are most requested feature",
        "Social proof elements increase engagement significantly",
        "Mobile users convert at 40% lower rate than desktop",
      ],
    },
    strategy: {
      uxPrinciples: [
        "Transparency-first design for trust building",
        "Progressive commitment reducing decision anxiety",
        "Social proof integration throughout journey",
        "Clear information hierarchy for complex projects",
      ],
      designApproach: [
        "Trust badges and verification indicators",
        "Video-forward project presentation",
        "Milestone-based progress visualization",
        "Mobile-optimized checkout flow",
      ],
    },
    userFlow: {
      keyFlows: [
        "Discovery: Browse → Filter → Preview → Deep Dive",
        "Evaluation: Project Page → Team → Updates → FAQ",
        "Pledge: Select Reward → Review → Checkout → Confirm",
        "Follow: Track → Updates → Milestones → Delivery",
      ],
      structuralImprovements: [
        "Added trust verification badges on project cards",
        "Restructured project page with scannable sections",
        "Implemented saved projects and comparison features",
        "Created dedicated milestone tracking dashboard",
      ],
    },
    designProcess: {
      wireframes: [
        "Sketched 4 different project page layouts",
        "Created wireframes for entire backer journey",
        "Built interactive prototype for testing",
        "Iterated through 5 rounds of user feedback",
      ],
      uiDirection: [
        "Clean, professional aesthetic building credibility",
        "Green accents suggesting growth and success",
        "Data visualization for funding progress",
        "Trust indicators integrated naturally into UI",
      ],
      accessibility: [
        "WCAG AA compliance across all pages",
        "Keyboard navigation for pledge flow",
        "Clear focus states for form elements",
        "Alt text for all project imagery",
        "Semantic HTML structure for screen readers",
      ],
    },
    finalSolution: {
      screens: [
        "Enhanced discovery page with filtering and trust badges",
        "Restructured project page with video hero and trust indicators",
        "Streamlined 3-step pledge checkout",
        "Backer dashboard with milestone tracking",
      ],
      keyFeatures: [
        "Creator verification system with background checks",
        "Dynamic funding progress with stretch goals",
        "Integrated update feed with push notifications",
        "Reward comparison tool for complex tier structures",
      ],
      uxImprovements: [
        "Reduced checkout steps from 7 to 3",
        "Added quick-pledge for repeat backers",
        "Implemented project comparison feature",
        "Created mobile-first responsive experience",
      ],
    },
    results: {
      metrics: [
        { value: "65%", label: "Conversion Increase" },
        { value: "$2.1M", label: "Total Funds Raised" },
        { value: "42%", label: "Bounce Rate Decrease" },
        { value: "4.9", label: "Backer Trust Score" },
      ],
      impact: [
        "Platform became known for creator verification",
        "Average project funding success rate increased to 68%",
        "Mobile conversion gap closed by 70%",
        "Featured in TechCrunch for innovative UX approach",
      ],
    },
    learnings: {
      whatWorked: [
        "Trust indicators had massive impact on conversion",
        "Video content was worth the implementation effort",
        "Simplified checkout dramatically improved completion",
        "Mobile-first approach paid dividends",
      ],
      whatToImprove: [
        "Would prioritize creator tools earlier",
        "More focus on post-campaign experience",
        "Better integration with social platforms",
        "Enhanced analytics for creators",
      ],
    },
    nextSteps: [
      "Implement AI-powered project success prediction",
      "Add social features for backer community",
      "Develop creator mobile app for updates",
      "Expand payment options internationally",
    ],
    nextCaseStudy: {
      slug: "travego",
      title: "Travego Tourism App",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/68ef08149358305.Y3JvcCw1MDAwLDM5MTAsMCw3NA.png",
    },
  },
  {
    id: "travego",
    slug: "travego",
    title: "Travego Tourism App",
    client: "Travego",
    category: "Travel & Tourism",
    outcomeStatement: "Redesigned travel booking experience reducing booking time by 60%",
    heroImage: "https://mir-s3-cdn-cf.behance.net/projects/404/68ef08149358305.Y3JvcCw1MDAwLDM5MTAsMCw3NA.png",
    heroMetrics: [
      { value: "60%", label: "Faster Booking" },
      { value: "4.7", label: "App Rating" },
      { value: "200K+", label: "Downloads" },
      { value: "45%", label: "Return Users" },
    ],
    snapshot: {
      industry: "Travel & Tourism",
      platform: "iOS & Android",
      timeline: "14 weeks",
      tools: ["Figma", "ProtoPie", "Lookback", "Mixpanel"],
      role: "Product Designer",
      teamSize: "6 members",
    },
    problem: {
      userProblems: [
        "Overwhelming number of options causing decision paralysis",
        "Complex multi-step booking process",
        "Difficulty comparing accommodation options",
        "Lack of personalized recommendations",
      ],
      businessChallenges: [
        "High cart abandonment during checkout",
        "Low repeat booking rate",
        "Customer support overload with booking issues",
        "Losing market share to simpler competitors",
      ],
    },
    goals: {
      businessGoals: [
        "Reduce booking abandonment by 50%",
        "Increase repeat booking rate to 40%",
        "Decrease customer support volume by 35%",
        "Improve app store rating to 4.5+",
      ],
      userGoals: [
        "Find and book trips in under 5 minutes",
        "Get personalized destination recommendations",
        "Easily compare options side-by-side",
        "Manage all trip details in one place",
      ],
      successMetrics: [
        "Average booking time < 5 minutes",
        "Booking completion rate > 75%",
        "Feature discovery rate > 60%",
        "User satisfaction score > 4.5",
      ],
    },
    myRole: {
      responsibilities: [
        "Conducted user research and journey mapping",
        "Led ideation and wireframing sessions",
        "Created high-fidelity prototypes",
        "Collaborated with development on implementation",
        "Measured and iterated based on analytics",
      ],
      ownershipLevel: "Owned end-to-end design for core booking experience",
    },
    research: {
      methods: [
        "12 contextual inquiry sessions with travelers",
        "Diary study over 3-week travel period",
        "Competitive analysis of 10 travel apps",
        "Analytics deep-dive on user drop-off points",
        "Usability testing of current app version",
      ],
      insights: [
        "Users spend 73% of time comparing options",
        "Price transparency is the #1 trust factor",
        "Trip planning is collaborative for 65% of users",
        "Mobile bookings peak during commute hours",
        "Users want to save and continue later",
      ],
    },
    strategy: {
      uxPrinciples: [
        "Reduce choices through smart curation",
        "Enable quick comparison at every step",
        "Support collaborative planning features",
        "Allow for interrupted sessions with easy resume",
      ],
      designApproach: [
        "Card-based UI for easy comparison",
        "Immersive destination imagery",
        "Step-by-step progress with ability to jump",
        "Dark mode for evening browsing",
      ],
    },
    userFlow: {
      keyFlows: [
        "Inspiration: Feed → Destination → Explore → Save",
        "Search: Dates → Destination → Filters → Results",
        "Book: Select → Customize → Review → Payment",
        "Manage: Itinerary → Changes → Support → Review",
      ],
      structuralImprovements: [
        "Added inspiration feed for undecided travelers",
        "Implemented comparison tray for up to 3 options",
        "Created trip collaboration with invite links",
        "Built smart resume for interrupted bookings",
      ],
    },
    designProcess: {
      wireframes: [
        "Explored 5 navigation models with users",
        "Created journey-based wireframe flows",
        "Built 3 prototype variants for A/B testing",
        "Refined based on 4 usability test rounds",
      ],
      uiDirection: [
        "Vibrant destination photography as hero elements",
        "Airy layout with generous white space",
        "Accent colors for interactive elements only",
        "Custom iconography for travel actions",
      ],
      accessibility: [
        "Color contrast ratios meeting WCAG AA",
        "Voice control support for hands-free booking",
        "Large touch targets for travel context",
        "Offline mode for saved trip details",
        "Multiple input methods for dates and locations",
      ],
    },
    finalSolution: {
      screens: [
        "Personalized inspiration feed with AI recommendations",
        "Smart search with flexible date suggestions",
        "Comparison view with feature highlights",
        "Streamlined checkout with saved payment",
      ],
      keyFeatures: [
        "AI destination matcher based on preferences",
        "Real-time price tracking with alerts",
        "Collaborative trip planning with voting",
        "Offline itinerary with map integration",
      ],
      uxImprovements: [
        "Reduced booking steps from 9 to 4",
        "Added quick rebook for past destinations",
        "Implemented smart autofill for forms",
        "Created gesture shortcuts for power users",
      ],
    },
    results: {
      metrics: [
        { value: "60%", label: "Faster Bookings" },
        { value: "78%", label: "Completion Rate" },
        { value: "4.7★", label: "App Store Rating" },
        { value: "45%", label: "Repeat Bookings" },
      ],
      impact: [
        "Booking completion rate exceeded targets by 20%",
        "App featured in 'Apps We Love' by Apple",
        "Support tickets reduced by 42%",
        "User acquisition cost decreased 25%",
      ],
    },
    learnings: {
      whatWorked: [
        "Comparison features resolved user decision anxiety",
        "Progressive disclosure kept complex flows manageable",
        "Collaborative features drove organic growth",
        "Smart defaults reduced friction significantly",
      ],
      whatToImprove: [
        "Would invest more in personalization early",
        "Better offline experience for traveling users",
        "More robust cancellation and changes flow",
        "Deeper integration with calendar apps",
      ],
    },
    nextSteps: [
      "Implement AR preview for destinations and hotels",
      "Add real-time local recommendations",
      "Develop Apple Watch companion for travel day",
      "Create voice-first booking interface",
    ],
    nextCaseStudy: {
      slug: "lily-meditation",
      title: "Lily Meditation App",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/d2f820148064435.Y3JvcCwxNjYyLDEzMDAsMjMwLDA.png",
    },
  },
  {
    id: "lily-meditation",
    slug: "lily-meditation",
    title: "Lily - Meditate Daily",
    client: "Lily Wellness",
    category: "Health & Wellness",
    outcomeStatement: "Created a calming meditation experience that improved user retention by 85%",
    heroImage: "https://mir-s3-cdn-cf.behance.net/projects/404/d2f820148064435.Y3JvcCwxNjYyLDEzMDAsMjMwLDA.png",
    heroMetrics: [
      { value: "85%", label: "Retention Increase" },
      { value: "4.9", label: "App Store Rating" },
      { value: "100K+", label: "Active Users" },
      { value: "28min", label: "Avg. Session" },
    ],
    snapshot: {
      industry: "Mental Health & Wellness",
      platform: "iOS & Android",
      timeline: "10 weeks",
      tools: ["Figma", "After Effects", "Maze", "Amplitude"],
      role: "Lead UI/UX Designer",
      teamSize: "4 members",
    },
    problem: {
      userProblems: [
        "Existing meditation apps felt clinical and cold",
        "Overwhelming content libraries caused choice paralysis",
        "Difficult to build consistent meditation habits",
        "Lack of progress visibility and motivation",
      ],
      businessChallenges: [
        "Week-1 retention below industry average",
        "Free-to-premium conversion rate of only 3%",
        "Limited differentiation in crowded market",
        "High CAC relative to lifetime value",
      ],
    },
    goals: {
      businessGoals: [
        "Increase day-7 retention to 50%",
        "Improve premium conversion to 8%",
        "Build distinctive brand identity",
        "Reduce CAC by 30% through organic growth",
      ],
      userGoals: [
        "Find the right meditation in under 30 seconds",
        "Build a sustainable daily practice",
        "See and celebrate their progress",
        "Feel calm from the moment they open the app",
      ],
      successMetrics: [
        "Day-7 retention > 50%",
        "Average session length > 15 minutes",
        "Streak maintenance rate > 40%",
        "Premium conversion > 8%",
      ],
    },
    myRole: {
      responsibilities: [
        "Defined product vision and UX strategy",
        "Created distinctive visual design language",
        "Designed motion and interaction patterns",
        "Led user testing and iteration cycles",
        "Collaborated on content strategy",
      ],
      ownershipLevel: "Full design ownership including brand expression in-app",
    },
    research: {
      methods: [
        "10 in-depth interviews with meditation practitioners",
        "Competitor experience audit of 12 apps",
        "Behavioral analysis of habit formation research",
        "A/B testing on onboarding variants",
        "Weekly user feedback sessions during beta",
      ],
      insights: [
        "Visual aesthetics directly impact perceived calm",
        "Simple choice architecture increases engagement",
        "Streak mechanics work when not punitive",
        "Evening is peak meditation time for target users",
        "Gentle reminders outperform aggressive notifications",
      ],
    },
    strategy: {
      uxPrinciples: [
        "Immediate calm through visual and motion design",
        "Minimal choices with curated recommendations",
        "Positive reinforcement without shame mechanics",
        "Seamless transition from life to practice",
      ],
      designApproach: [
        "Soft gradients and organic shapes",
        "Slow, intentional animations",
        "Nature-inspired color palette",
        "Typography that breathes with generous spacing",
      ],
    },
    userFlow: {
      keyFlows: [
        "Daily Practice: Open → Today's Pick → Meditate → Reflect",
        "Explore: Browse → Category → Preview → Start",
        "Progress: Stats → Streaks → Achievements → Share",
        "Personalize: Preferences → Schedule → Reminders",
      ],
      structuralImprovements: [
        "Created 'Today' screen with single recommended session",
        "Simplified navigation to 3 core sections",
        "Added gentle progress celebration moments",
        "Implemented flexible streak system with grace days",
      ],
    },
    designProcess: {
      wireframes: [
        "Explored ultra-minimal navigation concepts",
        "Created mood-based discovery prototypes",
        "Tested 3 progress visualization approaches",
        "Refined onboarding through 5 iterations",
      ],
      uiDirection: [
        "Soft purple and teal gradient palette",
        "Organic blob shapes as background elements",
        "Thin, airy typography with ample line height",
        "Custom illustrated meditation characters",
      ],
      accessibility: [
        "WCAG AA color contrast for all text",
        "Haptic feedback for meditation cues",
        "Screen reader support for guided sessions",
        "Reduced motion mode available",
        "Large, accessible touch targets",
      ],
    },
    finalSolution: {
      screens: [
        "Calming home screen with Today's recommendation",
        "Curated library with mood-based organization",
        "Gentle progress dashboard celebrating consistency",
        "Thoughtful settings with scheduling options",
      ],
      keyFeatures: [
        "AI-curated daily meditation based on patterns",
        "Adaptive session lengths based on available time",
        "Streak system with weekend grace periods",
        "Sleep stories with auto-fade feature",
      ],
      uxImprovements: [
        "One-tap access to start meditating",
        "Seamless audio transitions between screens",
        "Celebration moments that don't disrupt flow",
        "Smart notification timing based on behavior",
      ],
    },
    results: {
      metrics: [
        { value: "85%", label: "Retention Increase" },
        { value: "4.9★", label: "App Store Rating" },
        { value: "28min", label: "Avg Session Length" },
        { value: "12%", label: "Premium Conversion" },
      ],
      impact: [
        "Became top 10 meditation app within 6 months",
        "Users describe app as 'the calm app' in reviews",
        "Organic referrals account for 40% of new users",
        "Featured by Apple in Mental Wellness collection",
      ],
    },
    learnings: {
      whatWorked: [
        "Visual design investment paid massive dividends",
        "Simple daily pick reduced decision fatigue",
        "Gentle streak mechanics drove habit formation",
        "Sound design was as important as visuals",
      ],
      whatToImprove: [
        "Would add more social features earlier",
        "Better handling of session interruptions",
        "More content variety in initial launch",
        "Deeper personalization for returning users",
      ],
    },
    nextSteps: [
      "Implement biometric stress detection integration",
      "Add live group meditation sessions",
      "Create workplace wellness program offering",
      "Develop smart speaker and wearable versions",
    ],
    nextCaseStudy: {
      slug: "nourishhubs",
      title: "NourishHubs",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/4b248e215502141.Y3JvcCwyNjA2LDIwMzksMjI1LDA.png",
    },
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((cs) => cs.slug === slug);
};
