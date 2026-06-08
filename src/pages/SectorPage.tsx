import { Icon } from "../lib/icons";
import { PageHero, Pillars, SplitBlock, CTASection, type PillarItem } from "../components/sections";
import { VizRadar, VizNodes, VizChart } from "../components/viz";

export type SectorKey = "it" | "retail" | "healthcare" | "sports" | "hospitality";

interface SectorContent {
  name: string;
  eyebrow: string;
  titleA: string; italic: string; titleEnd: string;
  sub: string;
  pillars: PillarItem[];
  body: string[];
  points: string[];
  mediaPlaceholder: string;
}

const CONTENT: Record<SectorKey, SectorContent> = {
  it: {
    name: "Information Technology",
    eyebrow: "Portfolio — IT",
    titleA: "30+ technology", italic: "companies,", titleEnd: "one playbook.",
    sub: "Across SaaS, services, and infrastructure software — owning, operating, and scaling the next generation of category leaders.",
    pillars: [
      { icon: <Icon.Chip />,   title: "SaaS & products",   desc: "Vertical and horizontal software with sticky revenue.",                viz: <VizChart label="ARR growth" /> },
      { icon: <Icon.Growth />, title: "IT services",       desc: "Talent-driven consulting and managed services at scale.",              viz: <VizNodes /> },
      { icon: <Icon.Spark />,  title: "AI & data",         desc: "Applied AI businesses across enterprise and consumer markets.",        viz: <VizRadar /> },
    ],
    body: [
      "Vimtra has owned and operated more than thirty technology businesses across the United States and India — giving us pattern-recognition that's hard to replicate.",
      "We deploy a shared operating playbook across the portfolio: senior talent, disciplined sales motion, capital efficiency, and cross-portfolio commercial leverage.",
    ],
    points: ["Founder-friendly secondary liquidity", "Operating partners in residence", "Cross-portfolio enterprise relationships"],
    mediaPlaceholder: "/images/portfolio_it.png",
  },
  retail: {
    name: "Retail",
    eyebrow: "Portfolio — Retail",
    titleA: "Building", italic: "consumer", titleEnd: "brands.",
    sub: "Investing in differentiated consumer brands and the omnichannel experiences that scale them.",
    pillars: [
      { icon: <Icon.Cart />,   title: "Branded consumer", desc: "Owned brands with loyal communities and pricing power.",         viz: <VizChart label="LTV / CAC" /> },
      { icon: <Icon.Globe />,  title: "Omnichannel retail", desc: "Stores, DTC, and marketplace presence as one experience.",     viz: <VizNodes /> },
      { icon: <Icon.Spark />,  title: "Retail technology",  desc: "Software and data infrastructure powering modern commerce.",   viz: <VizRadar /> },
    ],
    body: [
      "Modern consumers expect brands to feel cohesive everywhere they touch them. We invest in operators who treat retail as one connected experience, not a stack of channels.",
      "Our portfolio benefits from shared expertise in supply chain, brand, and category management.",
    ],
    points: ["Brand-first investment thesis", "Supply chain & sourcing leverage", "Digital + physical playbook"],
    mediaPlaceholder: "/images/portfolio_retail.png",
  },
  healthcare: {
    name: "Healthcare",
    eyebrow: "Portfolio — Healthcare",
    titleA: "Healthier", italic: "outcomes,", titleEnd: "at scale.",
    sub: "Backing companies that improve clinical outcomes, expand access, and reduce cost across the care continuum.",
    pillars: [
      { icon: <Icon.Heart />,  title: "Care services",  desc: "Multi-site clinical platforms with measurable outcomes.",  viz: <VizChart label="Outcomes" /> },
      { icon: <Icon.Chip />,   title: "MedTech",         desc: "Devices and digital health that change clinical workflows.", viz: <VizRadar /> },
      { icon: <Icon.Globe />,  title: "Healthcare IT",  desc: "Software backbones for payers, providers, and patients.",   viz: <VizNodes /> },
    ],
    body: [
      "Healthcare requires patient capital and operating expertise — both of which we bring to every investment.",
      "We partner with clinically-led teams to build the next generation of care models.",
    ],
    points: ["Clinical advisory board", "Regulatory affairs in-house", "Outcomes-based investment thesis"],
    mediaPlaceholder: "/images/portfolio_healthcare.png",
  },
  sports: {
    name: "Sports Franchise",
    eyebrow: "Portfolio — Sports Franchise",
    titleA: "Where sport meets", italic: "opportunity.", titleEnd: "",
    sub: "Sports properties, entertainment IP, and the venues and platforms that bring them to fans.",
    pillars: [
      { icon: <Icon.Trophy />, title: "Sports properties", desc: "Clubs, leagues, and academies with global fan bases.",         viz: <VizRadar /> },
      { icon: <Icon.Spark />,  title: "Live entertainment", desc: "Venues, festivals, and experiential brands.",                 viz: <VizChart label="Attendance" /> },
      { icon: <Icon.Globe />,  title: "Media & IP",         desc: "Streaming, licensing, and digital fan experiences.",          viz: <VizNodes /> },
    ],
    body: [
      "Sports and entertainment are some of the most enduring categories of consumer attention — and they continue to globalise.",
      "We hold long-term and invest behind operators with both commercial discipline and cultural fluency.",
    ],
    points: ["Golf communities", "Soccer properties", "Live entertainment", "Long-term value creation"],
    mediaPlaceholder: "/images/portfolio_sports.png",
  },
  hospitality: {
    name: "Hospitality",
    eyebrow: "Portfolio — Hospitality",
    titleA: "Hospitality, the", italic: "experience", titleEnd: "way.",
    sub: "Branded hotels, resorts, and food-and-beverage concepts with distinctive guest experiences.",
    pillars: [
      { icon: <Icon.Bed />,    title: "Hotels & resorts", desc: "Branded keys in supply-constrained leisure and gateway markets.", viz: <VizChart label="RevPAR" /> },
      { icon: <Icon.Spark />,  title: "F&B concepts",     desc: "Chef-led concepts with scalable operating models.",                viz: <VizRadar /> },
      { icon: <Icon.Globe />,  title: "Experiential",     desc: "Members clubs, wellness, and lifestyle programming.",              viz: <VizNodes /> },
    ],
    body: [
      "Travel and experiences continue to take share of consumer wallet — particularly at the premium end.",
      "We co-invest in hospitality with category-defining operators and design-led brands.",
    ],
    points: ["Vertical operating capability", "Programmatic capital deployment", "Asset-light and asset-heavy structures"],
    mediaPlaceholder: "/images/hospitality_resort.png",
  },
};

export default function SectorPage({ sector }: { sector: SectorKey }) {
  const c = CONTENT[sector];
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.titleA} italic={c.italic} titleEnd={c.titleEnd} sub={c.sub}
        primary={{ label: "Discuss a partnership", href: "/contact" }}
        secondary={{ label: "Back to portfolio", href: "/portfolio" }} />
      <Pillars kicker="Where we invest" title="Three" italic="focus" titleEnd="areas." items={c.pillars} />
      <SplitBlock kicker="Our approach" title="Operating know-how, not just" italic="capital."
        body={c.body} points={c.points} cta={{ label: "Submit a thesis", href: "/contact" }}
        mediaPlaceholder={c.mediaPlaceholder} />
      <CTASection title={`Backing the next ${c.name.toLowerCase()}`} italic="leaders."
        secondary={{ label: "+1 732 666 2468", href: "tel:+17326662468" }} />
    </>
  );
}
