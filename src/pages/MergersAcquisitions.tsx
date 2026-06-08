import { Icon } from "../lib/icons";
import { PageHero, Pillars, Steps, CTASection, type PillarItem } from "../components/sections";
import { VizChart, VizNodes, VizRadar } from "../components/viz";

const PILLARS: PillarItem[] = [
  { icon: <Icon.Merge />,  title: "Sell-side advisory", desc: "Maximising value for shareholders through disciplined process and deep buyer relationships.",               viz: <VizNodes /> },
  { icon: <Icon.Growth />, title: "Buy-side advisory",  desc: "Sourcing, evaluating, and executing acquisitions aligned to your long-term strategic thesis.",              viz: <VizChart label="Deal flow" /> },
  { icon: <Icon.Globe />,  title: "Cross-border deals", desc: "Domestic and international transactions across regulatory, cultural, and operating complexity.",            viz: <VizRadar /> },
];

const STEPS = [
  { title: "Strategy & thesis", desc: "We start by aligning on objectives, market view, and value-creation levers." },
  { title: "Sourcing & evaluation", desc: "Proprietary deal flow and rigorous diligence to surface the right opportunities." },
  { title: "Negotiation & structuring", desc: "Creative deal structures that protect downside and unlock optionality." },
  { title: "Close & integration", desc: "Hands-on support through closing and the first 100 days post-deal." },
];

export default function MergersAcquisitions() {
  return (
    <>
      <PageHero eyebrow="Mergers & Acquisitions"
        title="Strategic deals," italic="built to" titleEnd="last."
        sub="From sell-side mandates to cross-border combinations, we structure transactions that compound value over decades."
        primary={{ label: "Discuss a deal", href: "/contact" }}
        secondary={{ label: "Our portfolio", href: "/portfolio" }} />
      <Pillars kicker="Capabilities" title="Full-cycle" italic="M&A" titleEnd="expertise."
        sub="A senior team across the full transaction lifecycle." items={PILLARS} />
      <Steps kicker="Process" title="A disciplined" italic="four-step" titleEnd="approach."
        sub="Clear roles, clear milestones, clear outcomes." steps={STEPS} />
      <CTASection title="Have a transaction" italic="in mind?"
        sub="Speak with our M&A team about your next deal." secondary={{ label: "+1 732 666 2468", href: "tel:+17326662468" }} />
    </>
  );
}
