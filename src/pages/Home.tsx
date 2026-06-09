import { Icon } from "../lib/icons";
import {
  HomeHero, Pillars, CompGrid, SectorGrid, FirmStatement, StatBand, CTASection,
  type PillarItem, type CompItem, type SectorItem, type Stat,
} from "../components/sections";
import { VizRadar, VizNodes, VizChart } from "../components/viz";

const MARQUEE: PillarItem[] = [
  { n: "01", icon: <Icon.Rocket />, title: "Venture Capital",      desc: "Early-stage funding and strategic guidance for high-growth startups across technology, AI, healthcare, and fintech.", viz: <VizRadar /> },
  { n: "02", icon: <Icon.Growth />, title: "Private Equity",        desc: "We back established technology products and services companies with strong growth potential — optimizing operations to scale.", viz: <VizNodes /> },
  { n: "04", icon: <Icon.Merge />,  title: "Mergers & Acquisitions", desc: "Domestic and cross-border mergers, acquisitions, divestitures, company combinations, and public-market takeovers.", viz: <VizChart /> },
];

const COMPS: CompItem[] = [
  { n: "01", icon: <Icon.Rocket />,    title: "Venture Capital",          desc: "Early-stage funding and guidance for high-growth startups in tech, AI, healthcare, and fintech." },
  { n: "02", icon: <Icon.Growth />,    title: "Private Equity",            desc: "Investing in established IT products and services companies, optimizing operations to unlock value." },
  { n: "03", icon: <Icon.Briefcase />, title: "Capital Placement",         desc: "Operating, growth, and acquisition financing across senior, mezzanine, and junior debt." },
  { n: "04", icon: <Icon.Merge />,     title: "Mergers & Acquisitions",    desc: "Domestic and cross-border mergers, acquisitions, divestitures, and public-market takeovers." },
  { n: "05", icon: <Icon.Spark />,     title: "Startups",                  desc: "Full-service incubation and investment across every stage of finance." },
  { n: "06", icon: <Icon.Refresh />,   title: "Business Restructuring",    desc: "A disciplined approach and innovative financing for businesses facing challenges." },
  { n: "07", icon: <Icon.Building />,  title: "Infrastructure Development", desc: "$650M+ in real estate projects under active development in high-growth target areas." },
  { n: "08", icon: <Icon.Chip />,      title: "Information Technology",    desc: "Owning and operating 30+ technology companies across the country." },
  { n: "09", icon: <Icon.Trophy />,    title: "Sports & Entertainment",    desc: "Long-term value creation across professional sports and entertainment ventures." },
];

const SECTORS: SectorItem[] = [
  { icon: <Icon.Chip />,     name: "Information Technology",  note: "30+ companies owned & operated", href: "/portfolio/it" },
  { icon: <Icon.Heart />,    name: "Healthcare",               note: "Medical technology & services",   href: "/portfolio/healthcare" },
  { icon: <Icon.Cart />,     name: "Retail",                   note: "Consumer brands & experiences",   href: "/portfolio/retail" },
  { icon: <Icon.Trophy />,   name: "Sports & Entertainment",   note: "Golf & soccer properties",        href: "/portfolio/sports" },
  { icon: <Icon.Building />, name: "Real Estate",              note: "$650M+ under development",        href: "/infrastructure" },
];

const STATS: Stat[] = [
  { v: "$650M+", l: "Real estate in development" },
  { v: "30+",    l: "IT companies operated" },
  { v: "4",      l: "Global offices" },
  { v: "5+",     l: "Sectors of focus" },
];

export default function Home() {
  return (
    <>
      <HomeHero
        headA="Powering growth"
        headItalic="through"
        headB="innovation."
        sub="Vimtra Ventures is a private equity and venture capital firm unlocking growth through strategic investments, corporate-finance expertise, and value-driven partnerships."
      />
      <Pillars id="capabilities" kicker="Core competencies"
        title="Capital, plus the" italic="conviction" titleEnd="to build."
        sub="Vimtra backs visionary enterprises with more than money — corporate-finance expertise, operating know-how, and long-term alignment."
        items={MARQUEE} />
      <CompGrid kicker="Full capabilities" title="Nine ways we" italic="create value."
        sub="From first cheque to full-scale transformation, Vimtra operates across the entire capital lifecycle."
        items={COMPS} />
      <SectorGrid kicker="Our portfolio" title="A diversified footprint across" italic="five sectors."
        sub="We partner with visionary enterprises worldwide to create long-term value and transformative growth."
        items={SECTORS} />
      <FirmStatement titleA="Powering growth" italicA="through innovation."
        mission="To empower innovation, accelerate growth, and build lasting value through visionary investments across venture capital, private equity, real estate, and technology — fostering strong partnerships and delivering execution with integrity, insight, and impact."
        vision="To be a global leader in investment and development — reshaping industries, redefining urban landscapes, and driving the next wave of technological and economic progress across every sector we serve." />
      <StatBand stats={STATS} />
      <CTASection title="Let's build something" italic="enduring."
        sub="Tell us about your company or thesis. Our team responds within two business days."
        secondary={{ label: "+1 732 666 2468", href: "tel:+17326662468" }} />
    </>
  );
}
