import { Icon } from "../lib/icons";
import { PageHero, Pillars, SplitBlock, StatBand, CTASection, type PillarItem, type Stat } from "../components/sections";
import { VizChart, VizNodes, VizRadar } from "../components/viz";

const PILLARS: PillarItem[] = [
  { icon: <Icon.Building />, title: "Mixed-use development", desc: "Live-work-play communities in high-growth U.S. metros.",                 viz: <VizNodes /> },
  { icon: <Icon.Spark />,    title: "Hospitality assets",     desc: "Branded hotels and resorts with experiential programming.",              viz: <VizChart label="NOI growth" /> },
  { icon: <Icon.Globe />,    title: "Mission-critical infra", desc: "Data centres, logistics, and energy infrastructure for the AI economy.", viz: <VizRadar /> },
];

const PROJECTS = [
  {
    name: "Lafayette Hills Golf Community",
    location: "Syracuse, New York",
    desc: "A signature luxury residential and golf community development, incorporating high-end single-family estates and premier resort amenities.",
    type: "Golf & Residential",
    img: "/images/infra_lafayette.png",
  },
  {
    name: "The Dalton @NoDa",
    location: "Charlotte, North Carolina",
    desc: "A 275-unit mid-rise multi-family residential development near Uptown Charlotte, bringing modern, transit-oriented living to Charlotte's premier arts district.",
    type: "Multi-family Residential",
    img: "/images/infra_dalton.png",
  },
  {
    name: "The Bays – Golf Lab & Suites",
    location: "Frisco, Texas",
    desc: "A luxury sports-entertainment and hospitality venue featuring state-of-the-art golf suites and premier lodging facilities in a fast-growing sports hub.",
    type: "Hospitality & Sports",
    img: "/images/infra_bays.png",
  },
  {
    name: "The Windgrove",
    location: "Kotagiri, Ooty, India",
    desc: "A premium eco-luxury residential resort community situated in the picturesque Western Ghats, blending sustainable architecture with high-end living.",
    type: "Luxury Eco-Resort",
    img: "/images/infra_windgrove.png",
  },
  {
    name: "Arka Grand",
    location: "Mahabalipuram, India",
    desc: "A luxury real estate development project near the historic shore of Mahabalipuram, combining luxury hospitality with premium mixed-use spaces.",
    type: "Mixed-use Coastal",
    img: "/images/infra_arka.png",
  },
  {
    name: "Indian Golf Premier League (IGPL)",
    location: "Chennai & Tier 2/3 Cities, India",
    desc: "Developing accessible golf infrastructure, including 8–10 acre courses, to support the growth of professional and recreational golf across emerging markets in India.",
    type: "Sports Infrastructure",
    img: "/images/infra_igpl.png",
  },
];

const STATS: Stat[] = [
  { v: "$450M+", l: "Under active development" },
  { v: "12+",    l: "Projects in pipeline" },
  { v: "3",      l: "Growth metros" },
  { v: "100%",   l: "In-house operating teams" },
];

export default function Infrastructure() {
  return (
    <>
      <PageHero eyebrow="Infrastructure Development"
        title="Building the" italic="places" titleEnd="value lives."
        sub="$450M+ of real estate and infrastructure under active development in high-growth target areas."
        primary={{ label: "Tour the pipeline", href: "/contact" }}
        secondary={{ label: "All sectors", href: "/portfolio" }} />
      <Pillars kicker="Asset classes" title="Three" italic="long-duration" titleEnd="strategies." items={PILLARS} />
      <SplitBlock kicker="Why infrastructure" title="Inflation-resilient yield with" italic="real upside."
        body={[
          "Real assets remain one of the most reliable hedges against inflation while delivering predictable cash flows over multi-decade horizons.",
          "We focus on supply-constrained metros where demographic and economic tailwinds support durable rent growth and capital appreciation.",
        ]}
        points={[
          "Vertical-integrated development & operations",
          "Bank, family-office, and institutional capital partners",
          "ESG-aligned design and construction standards",
        ]}
        cta={{ label: "Co-invest with us", href: "/contact" }}
        mediaPlaceholder="/images/infra_rendering.png" />

      {/* Featured Projects Section */}
      <section className="section" id="projects">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="kicker">Active Pipeline</div>
            <h2>Featured <span className="ital">Developments</span></h2>
            <p>A look at our $450M+ active real estate and infrastructure projects under development globally.</p>
          </div>
          <div className="cards" data-grid="ae-spring">
            {PROJECTS.map((p, i) => (
              <article key={i} className="card" data-tilt="4" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-glare" />
                <div style={{ position: 'relative', height: '180px', margin: '-26px -24px 20px -24px', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent-grad)', color: 'var(--accent-ink)', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.type}</span>
                </div>
                <div className="card-top" style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '18px' }}>{p.name}</h3>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon.Pin style={{ width: '13px', height: '13px', flexShrink: 0 }} />
                  <span>{p.location}</span>
                </div>
                <p className="desc" style={{ fontSize: '14.5px', color: 'var(--text-dim)', margin: 0, flexGrow: 1, minHeight: 'auto' }}>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StatBand stats={STATS} />
      <CTASection title="Co-investing in" italic="real assets."
        sub="LP, JV, and bilateral structures considered." secondary={{ label: "+1 732 666 2468", href: "tel:+17326662468" }} />
    </>
  );
}
