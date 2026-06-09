import { Icon } from "../lib/icons";
import { PageHero, Pillars, SplitBlock, StatBand, CTASection, type PillarItem, type Stat } from "../components/sections";
import { VizRadar, VizNodes, VizChart } from "../components/viz";

const PILLARS: PillarItem[] = [
  { icon: <Icon.Rocket />, title: "Venture capital",    desc: "Backing seed to Series C founders in technology, AI, healthcare, and fintech.",                viz: <VizRadar /> },
  { icon: <Icon.Growth />, title: "Growth equity",       desc: "Capital and operating support for proven businesses scaling toward category leadership.",     viz: <VizChart label="Scale-up" /> },
  { icon: <Icon.Spark />,  title: "Strategic platforms", desc: "Building durable platforms via thesis-driven acquisitions and operational improvement.",      viz: <VizNodes /> },
];

const STATS: Stat[] = [
  { v: "30+",    l: "IT companies operated" },
  { v: "$650M+", l: "Real estate in development" },
  { v: "4",      l: "Global offices" },
  { v: "5+",     l: "Sectors of focus" },
];

export default function PrivateEquity() {
  return (
    <>
      <PageHero eyebrow="Private Equity"
        title="Patient capital," italic="active" titleEnd="partnership."
        sub="We invest in established technology and services businesses with strong fundamentals — and partner closely to compound their value over the long term."
        primary={{ label: "Request a meeting", href: "/contact" }}
        secondary={{ label: "Our portfolio", href: "/portfolio" }} />
      <Pillars kicker="Strategies" title="Three ways we" italic="deploy" titleEnd="capital."
        items={PILLARS} />
      <SplitBlock kicker="Our approach" title="Operating know-how, not just" italic="capital."
        body={[
          "We've owned and operated more than 30 technology businesses — so we understand the operational levers that turn good companies into great ones.",
          "Our model pairs senior corporate-finance expertise with the patience and alignment our portfolio companies need to compound value across cycles.",
        ]}
        points={[
          "Long-duration capital, no artificial exit pressure",
          "Senior operators in every investment committee",
          "Cross-portfolio commercial relationships",
        ]}
        cta={{ label: "Submit a thesis", href: "/contact" }}
        mediaPlaceholder="/images/skyline.png, /images/deal_signing.png, /images/team.png" />
      <StatBand stats={STATS} />
      <CTASection title="Looking for a" italic="growth partner?"
        sub="Tell us about your business and the next chapter you're planning."
        secondary={{ label: "+1 732 666 2468", href: "tel:+17326662468" }} />
    </>
  );
}
