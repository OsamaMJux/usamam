export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: "local" | "international" | "shopping";
}

export interface PlannerCity {
  id: string;
  name: string;
  country: string;
  tagline: string;
  timezone: string;
  population: string;
  marketSize: string;
  // average ROI multiplier benchmark for the market (revenue per $ ad spend)
  baselineRoas: number;
  bestQuarter: "Q1" | "Q2" | "Q3" | "Q4";
  /** OpenStreetMap embed bbox: left,bottom,right,top + marker lat,lon */
  map: { bbox: string; marker: string };
  insights: string[];
  holidays: Holiday[];
}

const YEAR = 2026;
const d = (m: number, day: number) =>
  `${YEAR}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const plannerCities: PlannerCity[] = [
  {
    id: "lahore",
    name: "Lahore",
    country: "Pakistan",
    tagline: "Cultural capital with explosive digital growth",
    timezone: "PKT (UTC+5)",
    population: "13M+ metro",
    marketSize: "$2.1B e-commerce",
    baselineRoas: 3.4,
    bestQuarter: "Q2",
    map: {
      bbox: "74.18,31.41,74.50,31.65",
      marker: "31.5204,74.3587",
    },
    insights: [
      "Ramadan & Eid drive the largest annual spike — plan campaigns 6 weeks early",
      "TikTok + Instagram reels outperform static creatives by 3.2x",
      "Independence Day & Defence Day create patriotic content windows",
    ],
    holidays: [
      { date: d(2, 5), name: "Kashmir Day", type: "local" },
      { date: d(2, 14), name: "Valentine's Day", type: "shopping" },
      { date: d(3, 23), name: "Pakistan Day", type: "local" },
      { date: d(3, 20), name: "Ramadan Begins", type: "local" },
      { date: d(4, 19), name: "Eid-ul-Fitr", type: "local" },
      { date: d(5, 1), name: "Labour Day", type: "international" },
      { date: d(6, 26), name: "Eid-ul-Adha", type: "local" },
      { date: d(8, 14), name: "Independence Day", type: "local" },
      { date: d(9, 6), name: "Defence Day", type: "local" },
      { date: d(11, 27), name: "Black Friday", type: "shopping" },
      { date: d(12, 12), name: "12.12 Mega Sale", type: "shopping" },
      { date: d(12, 25), name: "Christmas / Quaid Day", type: "local" },
    ],
  },
  {
    id: "sacramento",
    name: "Sacramento",
    country: "USA",
    tagline: "California's underrated DTC launchpad",
    timezone: "PST (UTC-8)",
    population: "2.4M metro",
    marketSize: "$1.2T US e-commerce",
    baselineRoas: 4.2,
    bestQuarter: "Q4",
    map: {
      bbox: "-121.55,38.50,-121.40,38.62",
      marker: "38.5816,-121.4944",
    },
    insights: [
      "Q4 (BFCM → Christmas) accounts for 38% of annual DTC revenue",
      "Meta + Google paired with influencer seeding wins this market",
      "Back-to-school in August is the secondary spike worth pre-loading",
    ],
    holidays: [
      { date: d(1, 1), name: "New Year's Day", type: "international" },
      { date: d(1, 19), name: "MLK Day", type: "local" },
      { date: d(2, 14), name: "Valentine's Day", type: "shopping" },
      { date: d(2, 16), name: "Presidents' Day", type: "local" },
      { date: d(5, 10), name: "Mother's Day", type: "shopping" },
      { date: d(5, 25), name: "Memorial Day", type: "local" },
      { date: d(6, 21), name: "Father's Day", type: "shopping" },
      { date: d(7, 4), name: "Independence Day", type: "local" },
      { date: d(9, 7), name: "Labor Day", type: "local" },
      { date: d(10, 31), name: "Halloween", type: "shopping" },
      { date: d(11, 26), name: "Thanksgiving", type: "local" },
      { date: d(11, 27), name: "Black Friday", type: "shopping" },
      { date: d(11, 30), name: "Cyber Monday", type: "shopping" },
      { date: d(12, 25), name: "Christmas Day", type: "international" },
    ],
  },
  {
    id: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    tagline: "GCC's fastest-growing premium market",
    timezone: "AST (UTC+3)",
    population: "7.7M metro",
    marketSize: "$13B KSA e-commerce",
    baselineRoas: 5.1,
    bestQuarter: "Q1",
    map: {
      bbox: "46.55,24.55,46.85,24.85",
      marker: "24.7136,46.6753",
    },
    insights: [
      "Ramadan & White Friday are the two non-negotiable launch windows",
      "Arabic-first creative outperforms English by 2.4x — never translate, transcreate",
      "Premium positioning + COD options dramatically lift conversion",
    ],
    holidays: [
      { date: d(2, 22), name: "Founding Day", type: "local" },
      { date: d(3, 20), name: "Ramadan Begins", type: "local" },
      { date: d(4, 19), name: "Eid-ul-Fitr", type: "local" },
      { date: d(6, 26), name: "Eid-ul-Adha", type: "local" },
      { date: d(9, 23), name: "National Day", type: "local" },
      { date: d(11, 27), name: "White Friday", type: "shopping" },
      { date: d(12, 12), name: "12.12 Sale", type: "shopping" },
    ],
  },
  {
    id: "thailand",
    name: "Bangkok",
    country: "Thailand",
    tagline: "Southeast Asia's social commerce powerhouse",
    timezone: "ICT (UTC+7)",
    population: "10.7M metro",
    marketSize: "$26B SEA e-commerce",
    baselineRoas: 4.6,
    bestQuarter: "Q3",
    map: {
      bbox: "100.40,13.65,100.65,13.85",
      marker: "13.7563,100.5018",
    },
    insights: [
      "LINE + TikTok Shop dominate — Instagram is secondary here",
      "Mega sale days (9.9, 10.10, 11.11, 12.12) drive >40% of annual volume",
      "Songkran (April) and Loy Krathong create unique cultural content moments",
    ],
    holidays: [
      { date: d(1, 1), name: "New Year's Day", type: "international" },
      { date: d(2, 3), name: "Chinese New Year", type: "shopping" },
      { date: d(4, 13), name: "Songkran (Thai NY)", type: "local" },
      { date: d(5, 1), name: "Labour Day", type: "international" },
      { date: d(8, 12), name: "Mother's Day (Queen)", type: "local" },
      { date: d(9, 9), name: "9.9 Mega Sale", type: "shopping" },
      { date: d(10, 10), name: "10.10 Sale", type: "shopping" },
      { date: d(11, 11), name: "11.11 Mega Sale", type: "shopping" },
      { date: d(11, 14), name: "Loy Krathong", type: "local" },
      { date: d(12, 5), name: "Father's Day (King)", type: "local" },
      { date: d(12, 12), name: "12.12 Sale", type: "shopping" },
      { date: d(12, 25), name: "Christmas Day", type: "international" },
    ],
  },
];

export const PLANNER_YEAR = YEAR;
