import { HomeHero, FirmStatement, StatBand, CTASection, type Stat } from "../components/sections";
import { AreaTiles } from "../components/AreaTiles";

const STATS: Stat[] = [
  { v: "$1.1B+", l: "Real estate in development" },
  { v: "30+", l: "Tech & IT Companies Operated" },
  { v: "9", l: "Global offices" },
  { v: "5+", l: "Sectors of focus" },
];

/**
 * Redesigned home (CEO feedback): instead of eight stacked "database" sections
 * scrolling downward, the page now leads with the hero and immediately presents
 * every business area as a clickable tile — the whole portfolio at one glance —
 * followed by a slim proof strip and a single call to action.
 */
export default function Home() {
  return (
    <div className="home-tiled">
      <HomeHero
        headA="Powering growth"
        headItalic="through"
        headB="innovation."
        sub="A private equity and venture capital firm unlocking growth through strategic investments, corporate-finance expertise, and value-driven partnerships."
      />
      <AreaTiles />
      <FirmStatement titleA="Powering growth" italicA="through innovation."
        mission="To empower innovation, accelerate growth, and build lasting value through visionary investments across venture capital, private equity, real estate, and technology — fostering strong partnerships and delivering execution with integrity, insight, and impact."
        vision="To be a global leader in investment and development — reshaping industries, redefining urban landscapes, and driving the next wave of technological and economic progress across every sector we serve." />
      <StatBand stats={STATS} />
      <CTASection title="Let's build something" italic="enduring."
        sub="Tell us about your company or thesis. Our team responds within two business days."
        secondary={{ label: "info@vimtra.com", href: "mailto:info@vimtra.com" }} />
    </div>
  );
}
