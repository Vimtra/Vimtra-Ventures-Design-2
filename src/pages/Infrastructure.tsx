import { useState } from "react";
import { Icon } from "../lib/icons";
import { PageHero, Pillars, SplitBlock, StatBand, CTASection, type PillarItem, type Stat } from "../components/sections";
import { VizChart, VizNodes, VizRadar } from "../components/viz";
import { asset } from "../lib/asset";
import { ProjectModal } from "../components/ProjectModal";

const PILLARS: PillarItem[] = [
  { icon: <Icon.Building />, title: "Mixed-use development", desc: "Live-work-play communities in high-growth U.S. metros.",                 viz: <VizNodes /> },
  { icon: <Icon.Spark />,    title: "Hospitality assets",     desc: "Branded hotels and resorts with experiential programming.",              viz: <VizChart label="NOI growth" /> },
  { icon: <Icon.Globe />,    title: "Mission-critical infra", desc: "Data centres, logistics, and energy infrastructure for the AI economy.", viz: <VizRadar /> },
];

interface ProjectItem {
  name: string;
  location: string;
  img: string;
  region: "usa" | "india";
  url?: string;
  details?: Record<string, string>;
}

const PROJECTS: ProjectItem[] = [
  // USA PROJECTS
  {
    name: "The Bays – Golf Lab & Suites",
    location: "Frisco, Texas",
    img: "images/The-Bays.webp",
    region: "usa",
    details: {
      "Concept": "High-end golf experience with 24 boutique hotel rooms, private hitting bays, and a 25,000 sqft putting green.",
      "Key Features": "Partnership with TaylorMade, premium dining, immersive golf technology, and panoramic PGA course views.",
      "Strategic Partners": "The Beck Group, Akkadia, ClayMoore Engineering, Hospitality Alliance.",
      "Project Size": "$91 million.",
      "Status": "Partner agreements executed; development in advanced stages."
    }
  },
  {
    name: "Lafayette Hills Estates",
    location: "Lafayette, New York",
    img: "images/Lafayette-Hills-Estates.webp",
    region: "usa",
    details: {
      "Concept": "Redevelopment of a 160-acre country club into a lifestyle community with 260 homes, a 9-hole golf course, bike paths, lakes, and amenities.",
      "Model": "Rent-to-own housing model for incoming Micron workforce.",
      "Project Size": "$100+ million.",
      "Status": "Planning and approvals underway."
    }
  },
  {
    name: "Dalton 100 @ NoDa",
    location: "Charlotte, North Carolina",
    img: "images/Dalton 100 @ NoDa.webp",
    region: "usa",
    details: {
      "Concept": "275-unit, 7-story Class A mid-rise in Charlotte’s premier arts district.",
      "Location": "Located near LYNX Blue Line, boutique shopping, breweries, and dining.",
      "Project Size": "$80 million.",
      "Status": "Site assembly completed; pre-development underway."
    }
  },
  {
    name: "Hockley Residential",
    location: "Hockley, Texas",
    img: "images/Hockley Residential.webp",
    region: "usa",
    details: {
      "Concept": "547 acres entitled for 1,250+ residential lots near Houston.",
      "Project Size": "$70 million.",
      "Status": "Entitlements and infrastructure planning underway."
    }
  },
  {
    name: "Cross Roads Residential",
    location: "Cross Roads, Texas",
    img: "https://placehold.co/800x600/c00000/FFFFFF?text=Cross+Roads",
    region: "usa",
    details: {
      "Concept": "60 acres entitled for 42 residential lots.",
      "Project Size": "$15 million.",
      "Status": "Entitlement and development planning underway."
    }
  },
  {
    name: "Fort Pierce Land",
    location: "Fort Pierce, Florida",
    img: "https://placehold.co/800x600/343a40/FFFFFF?text=Fort+Pierce",
    region: "usa",
    details: {
      "Concept": "300 acres subdivided into 47 five-acre parcels.",
      "Project Size": "$12.5 million.",
      "Status": "Land division planning in progress."
    }
  },
  {
    name: "Perris Master Development",
    location: "Perris, California",
    img: "https://placehold.co/800x600/6c757d/FFFFFF?text=Perris+Master",
    region: "usa",
    details: {
      "Concept": "1,450 acres with an appraised value of $34 million. Planned as a mixed-use town center with residential, retail, commercial, and entertainment.",
      "Project Size": "$34 million.",
      "Status": "Master planning phase."
    }
  },
  {
    name: "The Summit @ Melissa Crossing",
    location: "Melissa, Texas",
    img: "images/the-summit-melissa.png",
    region: "usa",
    details: {
      "Concept": "Mixed-use project with retail frontage along I-75 and residential components.",
      "Project Size": "$30 million.",
      "Status": "Planning, entitlement, and pre-leasing phases."
    }
  },
  {
    name: "Bonito Lakes",
    location: "Celina, Texas",
    img: "images/bonito-lakes.jpg",
    region: "usa",
    details: {
      "Concept": "100-acre exclusive lakeside community featuring custom estates valued at $3M+ each.",
      "Location": "Located in one of America’s fastest-growing cities, designed for luxury living with expansive waterfront views and private amenities.",
      "Project Size": "$180 million.",
      "Status": "Master planning and pre-development underway."
    }
  },
  // INDIA PROJECTS
  {
    name: "Arka Grand",
    location: "Near Mahabalipuram",
    img: "images/arka-grand.png",
    region: "india",
    url: "https://www.arkagrand.com/",
    details: {
      "Location": "South of Chennai on ECR, 35 km from city",
      "Land Area": "390+ acres",
      "Residences": "Spanish Villas - 3BHK to 5BHK",
      "Key Amenities": "18-hole golf course, Longest Go-kart Racing Track, Crystal Lagoon, Dedicated ATV/Horse Riding Mud Track, Convention Center, Helipad",
      "Concept": "Luxury resort community with adventure, leisure & fine living"
    }
  },
  {
    name: "The Windgrove",
    location: "Kotagiri, Ooty, Tamilnadu",
    img: "images/the-windgrove.png",
    region: "india",
    url: "https://thewindgrove.com/",
    details: {
      "Location": "Kookal Highlands, Kotagiri (30 km from Ooty)",
      "Altitude": "6,400 feet above sea level",
      "Land Area": "15 acres - 52 exclusive plots",
      "Key Features": "Uyilatti Falls nearby, fertile soil, pristine mountain air",
      "Ideal For": "Farmhouse, homestay, wellness retreat, organic farming",
      "Investment Benefits": "Clear documentation, hassle-free registration, growing demand"
    }
  }
];

const STATS: Stat[] = [
  { v: "$1.1B+", l: "Under active development" },
  { v: "12+",    l: "Projects in pipeline" },
  { v: "3",      l: "Growth metros" },
  { v: "100%",   l: "In-house operating teams" },
];

export default function Infrastructure() {
  const [selectedProj, setSelectedProj] = useState<ProjectItem | null>(null);

  const usaProjects = PROJECTS.filter(p => p.region === "usa");
  const indiaProjects = PROJECTS.filter(p => p.region === "india");

  const renderProjectGrid = (projectsList: ProjectItem[]) => (
    <div className="cards" data-grid="ae-spring">
      {projectsList.map((p, i) => (
        <article key={i} className="card" data-tilt="4" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-glare" />
          <div style={{ position: 'relative', height: '180px', margin: '-26px -24px 20px -24px', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
            <img src={asset(p.img)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="card-top" style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '18px' }}>{p.name}</h3>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icon.Pin style={{ width: '13px', height: '13px', flexShrink: 0 }} />
            <span>{p.location}</span>
          </div>
          <p className="desc" style={{ fontSize: '14.5px', color: 'var(--text-dim)', margin: 0, flexGrow: 1, minHeight: 'auto', marginBottom: '20px' }}>
            {p.details ? (p.details.Concept || p.details.Vision || p.details.Development) : ""}
          </p>
          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={() => setSelectedProj(p)}
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center', padding: '10px 16px' }}
            >
              Learn More &rarr;
            </button>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <>
      <PageHero eyebrow="Infrastructure & Real Estate"
        title="Building the" italic="places" titleEnd="value lives."
        sub="$1.1 Billion of real estate and infrastructure under active development in high-growth target areas."
        bgImage="images/infra_rendering.png"
        primary={{ label: "Tour the pipeline", href: "/contact" }}
        secondary={{ label: "All sectors", href: "/portfolio" }} />
      <Pillars kicker="01 — Where we focus" title="Three" italic="long-duration" titleEnd="strategies." items={PILLARS} />
      <SplitBlock kicker="02 — How we operate" title="Inflation-resilient yield with" italic="real upside."
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
            <div className="kicker">03 — Track record</div>
            <h2>Featured <span className="ital">Developments</span></h2>
            <p>A look at our $1.1 Billion+ active real estate and infrastructure projects under development globally.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {/* USA Section */}
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px', color: '#fff', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>USA</h3>
              {renderProjectGrid(usaProjects)}
            </div>

            {/* India Section */}
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px', color: '#fff', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>India</h3>
              {renderProjectGrid(indiaProjects)}
            </div>
          </div>
        </div>
      </section>

      <StatBand stats={STATS} />
      <CTASection title="Co-investing in" italic="real assets."
        sub="LP, JV, and bilateral structures considered." secondary={{ label: "info@vimtra.com", href: "mailto:info@vimtra.com" }} />

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
