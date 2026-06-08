import React, { useState, useEffect, useRef } from "react";
import { PageHero, CTASection } from "../components/sections";
import { Icon } from "../lib/icons";
import { asset } from "../lib/asset";

interface TeamSection {
  title: string;
  body: React.ReactNode;
}

const SUBASH: TeamSection[] = [
  { title: "Entrepreneurship & Investments", body: (
    <ul>
      <li>Executed and owned 60+ successful global M&amp;A transactions, creating significant enterprise value.</li>
      <li>Founded, incubated, and scaled multiple technology startups, many of which have spun off into successful independent ventures.</li>
      <li>Established a reputation for fostering innovation-driven businesses.</li>
      <li>Expanded into data center ownership and operations, developing advanced facilities to support hyperscale, cloud, and enterprise infrastructure needs.</li>
    </ul>
  )},
  { title: "Infrastructure Development", body: (
    <p>A visionary developer of luxury real estate and golf resort communities, Subash is spearheading large-scale projects across North America and India. Signature projects include the Lafayette Hills Golf Community in Syracuse, New York, and the Dalton @Noda 275-unit mid-rise multi-family apartment complex near Uptown Charlotte in North Carolina.</p>
  )},
  { title: "Leadership, Mentorship & Advisory", body: (
    <>
      <p>In addition to entrepreneurship, Subash has served as a C-level executive and board advisor in multinational organizations across IT, infrastructure, banking, real estate, and digital infrastructure industries. His expertise spans:</p>
      <ul>
        <li>Corporate restructuring, governance, and financial recovery.</li>
        <li>Crisis and conflict management, asset divestitures, and creditor negotiations.</li>
        <li>Driving long-term strategic growth and global expansion initiatives. As a mentor, he actively guides the next generation of entrepreneurs, sharing insights on innovation, resilience, and sustainable growth.</li>
      </ul>
    </>
  )},
  { title: "Data Center Ownership & Capabilities", body: (
    <>
      <p>Subash along with Rao has strategically led Vimtra Ventures' growth in <b>data center infrastructure and digital ecosystem investments</b> to support the increasing demands of AI, cloud computing, and high-performance workloads.</p>
      <ul>
        <li><b>Ownership &amp; Development:</b> Spearheaded greenfield and brownfield data center projects across North America and India.</li>
        <li><b>Operational Expertise:</b> Proven experience in managing mission-critical facilities with Tier III and Tier IV standards for uptime and resilience.</li>
        <li><b>Capabilities:</b> Expertise in scalable design, edge data centers, and high-density deployments to meet diverse enterprise and hyperscale client needs.</li>
        <li><b>Strategic Partnerships:</b> Collaborated with global technology providers, cloud operators, and investment partners to deliver high-performance, sustainable, and cost-optimized facilities.</li>
      </ul>
    </>
  )},
  { title: "Philanthropy & Vision", body: (
    <p>Beyond business, Subash is a committed philanthropist, supporting educational initiatives, community development, and programs that empower underprivileged groups. He strongly believes in giving back to society by investing not only in ventures but also in people and communities. Subash remains dedicated to creating high-impact businesses that combine economic growth with social responsibility, reinforcing his role as a global business leader, CEO, mentor, philanthropist, and sports industry partner.</p>
  )},
];

const RAO: TeamSection[] = [
  { title: "Entrepreneurship & Investments", body: (
    <p>Throughout his career, Rao has guided global and opportunity-driven investments, offering strategic advisory services to occupiers, retailers, investors, corporations, landowners, and developers. His work encompasses market research, feasibility studies, land premium negotiations, development planning, and joint venture agreements.</p>
  )},
  { title: "Leadership, Mentorship & Advisory", body: (
    <p>He has advised on the restructuring and repositioning of diverse property types — ranging from industrial facilities, hotels, and residential communities to retail malls and mixed-use projects — across North America and Asia. In addition, he has supported secured and unsecured creditors, loan servicers, and acquirers in major debt restructurings.</p>
  )},
  { title: "Data Center Ownership & Capabilities", body: (
    <p>Rao has represented both public and private real estate and equity funds, as well as developers, in acquisitions, developments, and property sales, solidifying his reputation as a trusted advisor and industry leader.</p>
  )},
];

const VIVEK: TeamSection[] = [
  { title: "Strategic Leadership & Investment", body: (
    <ul>
      <li>Invested in and advised multiple emerging startups, guiding them through scale, market expansion, and acquisition phases.</li>
      <li>Deep expertise in mergers &amp; acquisitions, enterprise consulting, and strategic sales, with a consistent track record of identifying and unlocking high-growth opportunities.</li>
      <li>Skilled in structuring go-to-market strategies, building strategic alliances, and leading cross-functional teams to deliver measurable business outcomes.</li>
    </ul>
  )},
  { title: "Business Development & Growth Execution", body: (
    <p>Throughout his career, Vivek has partnered closely with executive leadership teams, institutional investors, and enterprise clients to drive revenue growth, broaden market presence, and build scalable, sustainable business solutions. His experience navigating complex business challenges across global markets has made him a go-to leader for companies pursuing transformation and long-term value creation.</p>
  )},
  { title: "Executive Development & Lifelong Learning", body: (
    <p>Vivek has pursued executive and professional development programs through Stanford Continuing Studies, deepening his expertise in innovation, leadership, emerging technologies, and global market dynamics. This commitment to lifelong learning reflects his belief in combining technology, business strategy, and investment insight to stay ahead in rapidly evolving markets.</p>
  )},
  { title: "Advisory & Board Engagements", body: (
    <p>Vivek serves on the Advisory Board of IGPL Chennai and Vimtra Ventures USA, where he contributes strategic guidance across investment decisions, business development, and global growth initiatives.</p>
  )},
];

const RAVI: TeamSection[] = [
  { title: "Entrepreneurship & Management", body: (
    <ul>
      <li>Functions at both strategic and operational levels.</li>
      <li>Strong financial acumen with experience in budgeting and cost control.</li>
      <li>Excels in negotiation, analysis, and planning.</li>
      <li>In-depth understanding of risk management.</li>
    </ul>
  )},
  { title: "Community & Philanthropy", body: (
    <p>Ravi Babu has served as a key member on the boards of organizations like the M.S. Swaminathan Research Foundation, where he implemented significant development works. He is an active member of the Tirumala Tirupati Devasthanams Local Advisory Committees (TTD LAC) in Chennai, the Rail Safety Council, and the Lions Club, among other social and cultural associations.</p>
  )},
];

const JACOB: TeamSection[] = [
  { title: "Operations & Leadership", body: (
    <p>Anto leads and oversees several key departments at Vimtra Ventures, including Human Resources, Accounts, Immigration, Compliance, Sales, and Recruiting. His leadership ensures that these teams operate in alignment with the overarching business objectives, fostering a cohesive and goal-driven work environment.</p>
  )},
  { title: "Technical & Industry Expertise", body: (
    <p>With global technical experience in IT consulting at Capgemini, Anto has worked with prominent clients such as Ladbrokes, GE Treasury, GE Capital, and GE Aviation. He is a certified Java programmer and has hands-on experience with SQL, Unix, Core Java, ServiceNow, and automation tools.</p>
  )},
  { title: "Vision", body: (
    <p>Anto is dedicated to building robust operational foundations that empower businesses to scale in a sustainable manner. By combining his technical proficiency with strong leadership capabilities, he is committed to transforming business strategies into seamless operational realities.</p>
  )},
];

const MEMBERS = [
  {
    name: "Subash Yammada",
    role: "CEO, Vimtra Ventures · Serial Entrepreneur · Investor · Mentor · Philanthropist",
    bio: "Subash Yammada is a dynamic serial entrepreneur and the CEO of Vimtra Ventures, a diversified global enterprise. With over 29 years of leadership experience, Subash has cultivated an expansive portfolio across sports franchises, private equity, venture capital, real estate development, technology investments, and data center operations — establishing himself as a global business leader and strategic advisor.",
    initials: "SY",
    sections: SUBASH,
    photoSrc: "/team/subash-yammada.jpeg",
  },
  {
    name: "Thimmaji Rao Yammada",
    role: "Managing Director, Vimtra Ventures · Serial Entrepreneur · Mentor · Leader",
    bio: "Rao Yammada is the Managing Director of Vimtra Ventures, bringing over 30 years of leadership in infrastructure, real estate, and industrial development across North America and India. He has successfully executed joint ventures and large-scale projects valued from $8 million to $120 million, with expertise spanning asset restructuring and full-cycle real estate development including commercial, residential, retail, and mixed-use assets.",
    initials: "TR",
    sections: RAO,
    photoSrc: "/team/thimmaji-roa-yammada.jpg",
  },
  {
    name: "Vivek Mahale",
    role: "Advisory Board Member, IGPL Chennai & Vimtra Ventures USA · Strategic Business Leader · Investor · Growth Advisor",
    bio: "Vivek Mahale is a seasoned business leader, investor, and entrepreneur with over two decades of experience driving transformational growth across technology, consulting, and life sciences sectors. Known for his sharp strategic instincts and out-of-the-box thinking, Vivek brings a rare combination of entrepreneurial vision, investment acumen, and operational leadership to the IGPL Chennai and Vimtra Ventures USA Board. His global career spans high-growth startups, enterprise organizations, and investment ecosystems — positioning him as a trusted advisor and catalyst for organizations at every stage of growth.",
    initials: "VM",
    sections: VIVEK,
    photoSrc: "/team/Vivek Mahale.jpeg",
  },
  {
    name: "M. Ravi Babu",
    role: "Additional Director, Vimtra Ventures",
    bio: "M. Ravi Babu is a seasoned director with 15 years of experience in leading software and educational consultancy services. As the Additional Director of Vimtra Ventures, he oversees a diverse portfolio that includes Educational Services, HR Value Services, a Law Firm, and US IT Staffing.",
    initials: "RB",
    sections: RAVI,
    photoSrc: "",
  },
  {
    name: "Surya Kotha",
    role: "Technology Advisory",
    bio: (
      <>
        <p>Surya heads up the technology advisory at Vimtra. With over 24 years of experience in the IT industry in a variety of senior management and leadership roles, Surya is actively involved with a number of start-ups as an investor, mentor, and advisor.</p>
        <p>He is well-known in the e-Commerce integration field and is regarded as a B2B ERP and e-Commerce expert. Surya's experience includes strategy consulting, product development, go-to-market strategies, business plan reviews, program management, channel relationship management, and IT services.</p>
      </>
    ),
    initials: "SK",
    sections: [],
    photoSrc: "/team/surya-kotha.jpg",
  },
  {
    name: "Jacob Baby Anto",
    role: "Head of Operations, Vimtra Ventures · Operations Strategist · Team Builder",
    bio: "Jacob Baby Anto serves as the Operations Head at Vimtra Ventures, where he leads the company's daily end-to-end business operations. Backed by more than a decade of professional experience, Mr. Anto brings a robust background in IT consulting services to his leadership role. His approach seamlessly integrates deep technical expertise with operational strategy, enabling him to effectively guide teams and optimize business processes across the organization.",
    initials: "JA",
    sections: JACOB,
    photoSrc: "/team/anto.jpg",
  },
];

const DUPLICATED_MEMBERS = [...MEMBERS, ...MEMBERS];

export default function Teams() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeMember = MEMBERS[((activeIndex % 6) + 6) % 6];

  useEffect(() => {
    setIsHovered(false);
  }, [activeIndex]);

  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  useEffect(() => {
    if (isHovered) {
      document.body.classList.add("member-hovered");
    } else {
      document.body.classList.remove("member-hovered");
    }
    return () => document.body.classList.remove("member-hovered");
  }, [isHovered]);

  const handleCardClick = (i: number) => {
    const currentBase = Math.floor(activeIndex / 12) * 12;
    let targetIndex = currentBase + i;
    let diff = targetIndex - activeIndex;
    if (diff > 6) targetIndex -= 12;
    else if (diff < -6) targetIndex += 12;
    setActiveIndex(targetIndex);
  };

  return (
    <>
      <PageHero
        eyebrow="Our leadership"
        title="Operators, investors,"
        italic="builders."
        titleEnd=""
        sub="A senior team across corporate finance, technology operations, and real-asset development — based in New York, San Francisco, Dallas, and India."
        primary={{ label: "Get in touch", href: "/contact" }}
      />

      <div className="team-carousel-section">
        {/* Top Section: Active Member Title & Name */}
        <div className="active-member-header text-center reveal reveal-in" style={{ minHeight: "120px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "-10px", position: "relative", zIndex: 10 }}>
          <h2 className="team-profile-name" style={{ margin: "0 0 8px 0", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600 }}>{activeMember.name}</h2>
          <p className="team-profile-role" style={{ margin: 0, color: "var(--accent)", fontWeight: 500, fontSize: "15px" }}>{activeMember.role}</p>
          <div className="team-profile-divider mx-auto" style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, var(--accent), transparent)", marginTop: "16px" }} />
        </div>

        {/* Carousel Viewport */}
        <div className="carousel-viewport" style={{ 
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)", 
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" 
        }}>
          <div className="carousel-container" style={{ transform: `rotateY(${activeIndex * 30}deg)` }}>
            {DUPLICATED_MEMBERS.map((member, i) => {
              const theta = i * 30;
              const isActive = ((activeIndex % 12) + 12) % 12 === i;
              const derivedInitials = member.initials || member.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

              return (
                <div
                  key={i}
                  className={`carousel-card ${isActive ? "active" : ""}`}
                  style={{
                    transform: `rotateY(${-theta}deg) translateZ(-420px)`,
                  }}
                >
                  <div className="carousel-card-photo">
                    {member.photoSrc ? (
                      <img src={asset(member.photoSrc)} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span className="carousel-card-initials">{derivedInitials}</span>
                    )}
                    <div className="team-profile-photo-glow" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2D hover/click proxy — sits in the 2D layer over the center card position
              since the 3D cards at translateZ(-420px) are unreachable by hit-testing */}
          <div
            className="carousel-hover-proxy"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "240px",
              height: "320px",
              transform: "translate(-50%, -50%)",
              zIndex: 50,
              cursor: "pointer",
              borderRadius: "var(--r-lg)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* Clickable side proxies for navigating to adjacent cards */}
          <div
            className="carousel-side-proxy prev"
            style={{
              position: "absolute",
              left: "calc(50% - 300px)",
              top: "50%",
              width: "200px",
              height: "320px",
              transform: "translateY(-50%)",
              zIndex: 50,
              cursor: "pointer",
            }}
            onClick={() => setActiveIndex(prev => prev - 1)}
          />
          <div
            className="carousel-side-proxy next"
            style={{
              position: "absolute",
              left: "calc(50% + 100px)",
              top: "50%",
              width: "200px",
              height: "320px",
              transform: "translateY(-50%)",
              zIndex: 50,
              cursor: "pointer",
            }}
            onClick={() => setActiveIndex(prev => prev + 1)}
          />

          {/* 2D Overlay for Bubbles to avoid 3D occlusion */}
          <div className="bubbles-container" style={{ position: "absolute", left: "50%", top: "50%", width: "240px", height: "320px", transform: "translate(-50%, -50%)", zIndex: 100, pointerEvents: "none" }}>
            {activeMember.sections && activeMember.sections.map((s, idx) => (
              <div 
                key={idx} 
                className={`bubble bubble-${idx} ${isHovered ? "show" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>{s.title}</span>
                <div className="bubble-content">
                  <div className="bubble-content-inner">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls positioned absolutely at edges */}
        <button
          type="button"
          onClick={() => setActiveIndex(prev => prev - 1)}
          className="carousel-nav-btn prev"
          aria-label="Previous team member"
        >
          <Icon.Arrow style={{ transform: "rotate(180deg)", width: "18px", height: "18px" }} />
        </button>
        <button
          type="button"
          onClick={() => setActiveIndex(prev => prev + 1)}
          className="carousel-nav-btn next"
          aria-label="Next team member"
        >
          <Icon.Arrow style={{ width: "18px", height: "18px" }} />
        </button>

        {/* Bottom Section: Active Member Bio Only */}
        <div className="carousel-active-info">
          <div className="wrap">
            <div className="team-profile-bio text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
              {typeof activeMember.bio === "string" ? <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-dim)", margin: 0 }}>{activeMember.bio}</p> : activeMember.bio}
            </div>
          </div>
        </div>
      </div>

      <CTASection
        title="Want to"
        italic="join the team?"
        sub="We're always interested in exceptional operators and investors."
        secondary={{ label: "syammada@vimtra.com", href: "mailto:syammada@vimtra.com" }}
      />
    </>
  );
}
