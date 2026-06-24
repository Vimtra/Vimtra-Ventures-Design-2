import { useState } from "react";
import { Icon } from "../lib/icons";
import { PageHero, Pillars, SplitBlock, CTASection, type PillarItem } from "../components/sections";
import { VizRadar, VizNodes, VizChart } from "../components/viz";
import { ProjectModal } from "../components/ProjectModal";
import { asset } from "../lib/asset";

export type SectorKey = "it" | "retail" | "healthcare" | "sports" | "hospitality";

interface ProjectItem {
  name: string;
  subtitle?: string;
  location?: string;
  img: string;
  url?: string;
  details?: Record<string, string>;
  category?: string;
}

interface SectorContent {
  name: string;
  eyebrow: string;
  titleA: string;
  italic: string;
  titleEnd: string;
  sub: string;
  pillars: PillarItem[];
  body: string[];
  points: string[];
  mediaPlaceholder: string;
  projects?: ProjectItem[];
}

const CONTENT: Record<SectorKey, SectorContent> = {
  it: {
    name: "Information Technology",
    eyebrow: "Portfolio — IT",
    titleA: "30+ technology",
    italic: "companies,",
    titleEnd: "one playbook.",
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
    titleA: "Building",
    italic: "consumer",
    titleEnd: "brands.",
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
    projects: [
      {
        name: "Aha Amoham",
        img: "images/aha-amoham.jpg",
        url: "#",
      },
      {
        name: "Hashtag India",
        img: "images/hastagindia.png",
        url: "https://www.hashtagindia.com/",
      },
      {
        name: "Drizzles Icecream",
        img: "images/drizzles.jpg",
        url: "https://drizzlesicecream.com/",
      },
    ],
  },
  healthcare: {
    name: "Healthcare",
    eyebrow: "Portfolio — Healthcare",
    titleA: "Healthier",
    italic: "outcomes,",
    titleEnd: "at scale.",
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
    projects: [
      {
        name: "Prime Choice",
        subtitle: "Family Clinic & Urgent Care",
        img: "images/Prime-choice.jpg",
        url: "https://primechoiceurgent.com/",
      },
      {
        name: "Rushi Pharma",
        img: "images/rushi-pharma.jpg",
        url: "https://www.rushipharma.com/",
      },
    ],
  },
  sports: {
    name: "Sports Franchise",
    eyebrow: "Portfolio — Sports Franchise",
    titleA: "Where sport meets",
    italic: "opportunity.",
    titleEnd: "",
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
    projects: [
      {
        name: "The Bays – Golf Lab & Suites",
        location: "Frisco, Texas",
        img: "images/The-Bays.webp",
        url: "#",
        category: "Golf Communities",
        details: {
          "Concept": "High-end golf experience with 24 boutique hotel rooms, private hitting bays, and a 25,000 sqft putting green.",
          "Key Features": "Partnership with TaylorMade, premium dining, immersive golf technology, and panoramic PGA course views.",
          "Strategic Partners": "The Beck Group, Akkadia, ClayMoore Engineering, Hospitality Alliance.",
          "Project Size": "$91 million.",
          "Status": "Partner agreements executed; development in advanced stages."
        }
      },
      {
        name: "Arkagrand",
        location: "India",
        img: "images/arka-grand.png",
        url: "https://www.arkagrand.com/",
        category: "Golf Communities",
        details: {
          "Location": "South of Chennai on ECR (Mahabalipuram)",
          "Size": "120 acres",
          "Development": "Luxury master-planned community with residences, country club, 9-hole executive golf course, equestrian facilities, adventure centre, and backwaters",
          "Status": "Active Development"
        }
      },
      {
        name: "IGPL",
        subtitle: "Indian Golf Premier League",
        location: "India",
        img: "images/igpl.webp",
        url: "https://theigpl.com/",
        category: "Golf Communities",
        details: {
          "Vision": "Transforming golf landscape in India",
          "Formats": "Three formats - The Tour, Turf Wars (city clash), Showdown (extreme golf)",
          "Focus": "Faster-paced, younger, inclusive, modern golf with broadcast-centric culture",
          "Model": "City-based teams and franchise pathways for professional golfers",
          "Status": "Active League"
        }
      },
      {
        name: "Dallas Sidekicks",
        location: "Texas",
        img: "images/Dallas Sidekicks.jpg",
        url: "https://www.dallassidekicks.net/",
        category: "Soccer",
        details: {
          "Location": "Allen, Texas (Dallas-Fort Worth Metroplex)",
          "Stadium": "Credit Union of Texas Event Center, Allen",
          "Type": "Professional Indoor Soccer Franchise",
          "League": "Major Arena Soccer League (MASL)",
          "Founded": "2012 (reboot of original 1984-2004 franchise)",
          "Status": "Active League"
        }
      }
    ],
  },
  hospitality: {
    name: "Hospitality",
    eyebrow: "Portfolio — Hospitality",
    titleA: "Hospitality, the",
    italic: "experience",
    titleEnd: "way.",
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
  const [selectedProj, setSelectedProj] = useState<ProjectItem | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderProjectGrid = (projectsList: ProjectItem[]) => (
    <div className="cards" data-grid="ae-spring">
      {projectsList.map((p, i) => (
        <article key={i} className="card" data-tilt="4" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-glare" />
          <div style={{ position: 'relative', height: '180px', margin: '-26px -24px 20px -24px', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
            <img src={asset(p.img)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {p.subtitle ? (
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent-grad)', color: 'var(--accent-ink)', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {p.subtitle}
              </span>
            ) : null}
          </div>
          <div className="card-top" style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '18px' }}>{p.name}</h3>
          </div>
          {p.location && (
            <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon.Pin style={{ width: '13px', height: '13px', flexShrink: 0 }} />
              <span>{p.location}</span>
            </div>
          )}
          <p className="desc" style={{ fontSize: '14.5px', color: 'var(--text-dim)', margin: 0, flexGrow: 1, minHeight: 'auto', marginBottom: '20px' }}>
            {p.details ? (p.details.Concept || p.details.Vision || p.details.Development) : ""}
          </p>
          <div style={{ marginTop: 'auto' }}>
            {p.details ? (
              <button
                onClick={() => setSelectedProj(p)}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', padding: '10px 16px' }}
              >
                Learn More &rarr;
              </button>
            ) : (
              <a
                href={p.url || "#"}
                target={p.url === "#" ? undefined : "_blank"}
                rel={p.url === "#" ? undefined : "noopener noreferrer"}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Learn More &rarr;
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );

  const golfProjects = c.projects?.filter((p) => p.category === "Golf Communities") || [];
  const soccerProjects = c.projects?.filter((p) => p.category === "Soccer") || [];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.titleA} italic={c.italic} titleEnd={c.titleEnd} sub={c.sub}
        primary={{ label: "Discuss a partnership", href: "/contact" }}
        secondary={{ label: "Back to portfolio", href: "/portfolio" }} />
      <Pillars kicker="Where we invest" title="Three" italic="focus" titleEnd="areas." items={c.pillars} />
      <SplitBlock kicker="Our approach" title="Operating know-how, not just" italic="capital."
        body={c.body} points={c.points} cta={{ label: "Submit a thesis", href: "/contact" }}
        mediaPlaceholder={c.mediaPlaceholder} />

      {/* Sports navigation buttons */}
      {sector === "sports" && (
        <section className="section py-5" style={{ paddingBottom: '0' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div 
                onClick={() => scrollToSection("golf-communities")}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                className="ae-spring-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <img src={asset("images/golf.jpg")} alt="Golf Communities" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 8, 10, 0.9) 0%, rgba(8, 8, 10, 0.2) 70%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px',
                }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '22px' }}>Golf Communities</h3>
                </div>
              </div>

              <div 
                onClick={() => scrollToSection("soccer")}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                className="ae-spring-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <img src={asset("images/soccer.jpg")} alt="Soccer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 8, 10, 0.9) 0%, rgba(8, 8, 10, 0.2) 70%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px',
                }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '22px' }}>Soccer</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects list per sector */}
      {sector === "retail" && c.projects && (
        <section className="section bg-light pt-0">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Retail Portfolio</div>
              <h2>Featured <span className="ital">Retail Projects</span></h2>
            </div>
            {renderProjectGrid(c.projects)}
          </div>
        </section>
      )}

      {sector === "healthcare" && c.projects && (
        <section className="section bg-light pt-0">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Healthcare Portfolio</div>
              <h2>Featured <span className="ital">Healthcare Ventures</span></h2>
            </div>
            {renderProjectGrid(c.projects)}
          </div>
        </section>
      )}

      {sector === "sports" && c.projects && (
        <>
          <section id="golf-communities" className="section bg-light pt-5">
            <div className="wrap">
              <div className="section-head reveal">
                <div className="kicker">Golf Portfolio</div>
                <h2>Flagship <span className="ital">Golf Developments</span></h2>
              </div>
              {renderProjectGrid(golfProjects)}
            </div>
          </section>

          <section id="soccer" className="section">
            <div className="wrap">
              <div className="section-head reveal">
                <div className="kicker">Soccer Portfolio</div>
                <h2>Soccer <span className="ital">Portfolio</span></h2>
              </div>
              {renderProjectGrid(soccerProjects)}
            </div>
          </section>
        </>
      )}

      <CTASection title={`Backing the next ${c.name.toLowerCase()}`} italic="leaders."
        secondary={{ label: "info@vimtra.com", href: "mailto:info@vimtra.com" }} />

      <ProjectModal
        isOpen={!!selectedProj}
        onClose={() => setSelectedProj(null)}
        title={selectedProj?.name || ""}
        imgUrl={selectedProj?.img || ""}
        details={selectedProj?.details}
        url={selectedProj?.url}
      />
    </>
  );
}
