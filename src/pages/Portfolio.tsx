import { Icon } from "../lib/icons";
import { PageHero, SectorGrid, StatBand, CTASection, type SectorItem, type Stat } from "../components/sections";

const SECTORS: SectorItem[] = [
  { icon: <Icon.Chip />,     name: "Information Technology",  note: "30+ companies owned & operated",       href: "/portfolio/it",          feat: true },
  { icon: <Icon.Heart />,    name: "Healthcare",               note: "Medical technology & services",       href: "/portfolio/healthcare" },
  { icon: <Icon.Cart />,     name: "Retail",                   note: "Consumer brands & experiences",       href: "/portfolio/retail" },
  { icon: <Icon.Trophy />,   name: "Sports Franchise",         note: "Golf & soccer properties",            href: "/portfolio/sports",      feat: true },
];

const STATS: Stat[] = [
  { v: "$450M+", l: "Real estate in development" },
  { v: "30+",    l: "IT companies operated" },
  { v: "4",      l: "Global offices" },
  { v: "4",      l: "Sectors of focus" },
];

export default function Portfolio() {
  return (
    <>
      <PageHero eyebrow="Our portfolio"
        title="A diversified" italic="footprint." titleEnd=""
        sub="Across technology, healthcare, retail, and sports franchises — partnering with visionary enterprises worldwide."
        primary={{ label: "Discuss a partnership", href: "/contact" }} />
      <SectorGrid items={SECTORS} />
      <StatBand stats={STATS} />
      <CTASection title="Building something" italic="worth backing?"
        sub="We're always looking for category-defining founders and operators."
        secondary={{ label: "+1 732 666 2468", href: "tel:+17326662468" }} />
    </>
  );
}
