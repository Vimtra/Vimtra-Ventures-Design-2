import { useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { FluidBackground } from "../lib/FluidBackground";
import { BlackHole } from "./BlackHole";
import { CountUp } from "./CountUp";
import { COMPANY } from "../data";

/* ---------- common ---------- */
interface CTA { label: string; href: string }
interface Head { kicker?: string; title?: string; italic?: string; titleEnd?: string; sub?: string }

export function SectionHead({ kicker, title, italic, titleEnd, sub, left }: Head & { left?: boolean }) {
  return (
    <div className={"section-head reveal" + (left ? " left" : "")}>
      {kicker ? <div className="kicker">{kicker}</div> : null}
      <h2>{title} {italic ? <span className="ital">{italic}</span> : null} {titleEnd}</h2>
      {sub ? <p>{sub}</p> : null}
    </div>
  );
}

/* ---------- page hero (interior pages) ---------- */
interface PageHeroProps extends Head {
  eyebrow?: string;
  primary?: CTA;
  secondary?: CTA;
  fluid?: boolean;
}
export function PageHero({ eyebrow, title, italic, titleEnd, sub, primary, secondary, fluid }: PageHeroProps) {
  return (
    <header className="page-hero">
      {fluid ? <FluidBackground className="fluid-canvas" /> : <div className="page-hero-bg grain" />}
      <div className="page-hero-vig" />
      <div className="wrap">
        <div className="page-hero-inner reveal">
          {eyebrow ? <div className="eyebrow"><span className="dot" /><span>{eyebrow}</span></div> : null}
          <h1>{title} {italic ? <span className="ital">{italic}</span> : null} {titleEnd}</h1>
          {sub ? <p className="sub">{sub}</p> : null}
          {(primary || secondary) ? (
            <div className="hero-actions">
              {primary ? <Link className="btn btn-primary btn-lg" to={primary.href}>{primary.label} <Icon.Arrow /></Link> : null}
              {secondary ? <Link className="btn btn-ghost btn-lg" to={secondary.href}>{secondary.label}</Link> : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/* ---------- home hero ---------- */
interface HomeHeroProps { headA: string; headItalic: string; headB: string; sub: string }
export function HomeHero({ headA, headItalic, headB, sub }: HomeHeroProps) {
  return (
    <header className="hero hero--cosmic" id="top">
      <div className="hero-space" />
      <div className="hero-stars" />
      <BlackHole />
      <div className="hero-floor" />
      <div className="hero-vignette" />
      <div className="wrap">
        <div className="hero-inner" data-stagger="ae-smooth">
          <div className="eyebrow">
            <span className="dot" />
            <span><b>Vimtra Ventures</b> — Private Equity &amp; Venture Capital</span>
            <span className="arrow">→</span>
          </div>
          <h1>{headA} <span className="ital">{headItalic}</span> {headB}</h1>
          <p className="sub">{sub}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg ae-elastic-hover" to="/contact">Request a meeting <Icon.Arrow /></Link>
            <Link className="btn btn-glass btn-lg ae-elastic-hover" to="/private-equity"><span>Explore our concept</span></Link>
          </div>
          <div className="trust">
            <span><Icon.Check /> Venture capital</span>
            <span><Icon.Check /> Private equity</span>
            <span><Icon.Check /> M&amp;A &amp; restructuring</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- pillars / feature cards ---------- */
export interface PillarItem { n?: string; icon: ReactNode; title: string; desc: string; viz?: ReactNode }
export function Pillars({ id, kicker, title, italic, titleEnd, sub, items }: Head & { id?: string; items: PillarItem[] }) {
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <SectionHead kicker={kicker} title={title} italic={italic} titleEnd={titleEnd} sub={sub} />
        <div className="cards" data-stagger="ae-spring">
          {items.map((c, i) => (
            <article className="card" data-tilt="6" key={i}>
              <div className="card-glare" />
              <div className="card-top">
                <div className="icon ae-spring-in" style={{ animationDelay: `${0.1 + i * 0.15}s` }}>{c.icon}</div>
                <h3>{c.title}</h3>
                {c.n ? <span className="card-tag">{c.n}</span> : null}
              </div>
              <p className="desc">{c.desc}</p>
              {c.viz || null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- competency grid ---------- */
export interface CompItem { n: string; icon: ReactNode; title: string; desc: string }
export function CompGrid({ kicker, title, italic, titleEnd, sub, items }: Head & { items: CompItem[] }) {
  return (
    <section className="section comp-section">
      <div className="wrap">
        <div className="comp-head reveal">
          <div>
            <div className="kicker">{kicker}</div>
            <h2 className="comp-title">{title} {italic ? <span className="ital">{italic}</span> : null} {titleEnd}</h2>
          </div>
          {sub ? <p>{sub}</p> : null}
        </div>
        <div className="comp-grid" data-grid="ae-spring">
          {items.map((it) => (
            <article className="comp-card" data-tilt="5" key={it.n}>
              <div className="comp-card-top">
                <span className="comp-ico">{it.icon}</span>
                <span className="comp-n">{it.n}</span>
              </div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- sector grid ---------- */
export interface SectorItem { icon: ReactNode; name: string; note: string; href: string; feat?: boolean }

const getSectorImage = (href: string) => {
  if (href.includes("it")) return "/images/portfolio_it.png";
  if (href.includes("healthcare")) return "/images/portfolio_healthcare.png";
  if (href.includes("retail")) return "/images/portfolio_retail.png";
  if (href.includes("sports")) return "/images/portfolio_sports.png";
  if (href.includes("infrastructure") || href.includes("real-estate") || href.includes("infrastructure.html")) return "/images/infra_rendering.png";
  return "";
};

export function SectorGrid({ kicker, title, italic, titleEnd, sub, items }: Head & { items: SectorItem[] }) {
  return (
    <section className="section sectors-section" id="sectors">
      <div className="wrap">
        {(title || kicker) ? <SectionHead kicker={kicker} title={title} italic={italic} titleEnd={titleEnd} sub={sub} /> : null}
        <div className="sectors-grid" data-grid="ae-smooth">
          {items.map((s) => {
            const bgImg = getSectorImage(s.href);
            return (
              <Link className={"sector-tile" + (s.feat ? " span2" : "")} to={s.href} data-tilt="5" key={s.name}>
                <div 
                  className="sector-bg" 
                  style={bgImg ? { backgroundImage: `linear-gradient(to top, #08080a 0%, rgba(8, 8, 10, 0.45) 60%, transparent 100%), url(${bgImg})` } : undefined} 
                />
                <div className="sector-glow" />
                <div className="sector-ico">{s.icon}</div>
                <div className="sector-meta"><h3>{s.name}</h3><p>{s.note}</p></div>
                <span className="sector-arrow"><Icon.Arrow /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- stats ---------- */
export interface Stat { v: string; l: string }
export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="section stat-section">
      <div className="wrap">
        <div className="stats-band" data-grid>
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="stat-v"><CountUp value={s.v} /></div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- steps ---------- */
export interface Step { title: string; desc: string }
export function Steps({ kicker, title, italic, titleEnd, sub, steps }: Head & { steps: Step[] }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead kicker={kicker} title={title} italic={italic} titleEnd={titleEnd} sub={sub} />
        <div className="steps" data-grid>
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-n">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SplitProps extends Head {
  body?: string[];
  points?: string[];
  reverse?: boolean;
  cta?: CTA;
  mediaPlaceholder?: string;
}

export function SplitBlock({ kicker, title, italic, titleEnd, body, points, reverse, cta, mediaPlaceholder }: SplitProps) {
  const images = mediaPlaceholder ? mediaPlaceholder.split(",").map(s => s.trim()) : [];
  const hasMultiple = images.length > 1;
  const isImage = images.length > 0 && (images[0].startsWith("/") || images[0].includes("."));

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [hasMultiple, images.length]);

  return (
    <section className="section">
      <div className="wrap">
        <div className={"split" + (reverse ? " reverse" : "")}>
          <div className="split-copy reveal">
            {kicker ? <div className="kicker">{kicker}</div> : null}
            <h2>{title} {italic ? <span className="ital">{italic}</span> : null} {titleEnd}</h2>
            {(body || []).map((p, i) => <p key={i} className="split-p">{p}</p>)}
            {points ? (
              <ul className="ticks">
                {points.map((pt, i) => <li key={i}><span className="tick"><Icon.Check /></span>{pt}</li>)}
              </ul>
            ) : null}
            {cta ? <Link className="btn btn-primary" to={cta.href} style={{ marginTop: 26 }}>{cta.label} <Icon.Arrow /></Link> : null}
          </div>
          <div className="split-media reveal" style={{ position: "relative" }}>
            <div className="split-slot" style={{ background: "var(--bg-2)", height: "clamp(320px,42vw,480px)", borderRadius: 18, display: "grid", placeItems: "center", color: "var(--text-faint)", fontSize: 14, overflow: "hidden", position: "relative" }}>
              {isImage ? (
                <>
                  {images.map((imgUrl, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <img
                        key={imgUrl}
                        src={imgUrl}
                        alt={`${title || 'Media'} slide ${idx + 1}`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 0.8s ease-in-out",
                          zIndex: isActive ? 2 : 1
                        }}
                      />
                    );
                  })}
                  {hasMultiple && (
                    <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveIdx(idx)}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            border: "none",
                            background: idx === activeIdx ? "var(--accent)" : "rgba(255, 255, 255, 0.4)",
                            cursor: "pointer",
                            padding: 0,
                            transition: "background 0.3s ease, transform 0.3s ease",
                            transform: idx === activeIdx ? "scale(1.2)" : "scale(1)",
                            boxShadow: idx === activeIdx ? "0 0 8px var(--glow)" : "none"
                          }}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                mediaPlaceholder || "Imagery"
              )}
            </div>
            <div className="split-frame" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- mission/vision (firm) ---------- */
export function FirmStatement({ titleA, italicA, titleEndA, mission, vision }:
  { titleA: string; italicA: string; titleEndA?: string; mission: string; vision: string }) {
  return (
    <section className="section firm-section" id="firm">
      <div className="wrap">
        <div className="firm-grid">
          <div className="firm-intro reveal">
            <div className="kicker">The firm</div>
            <h2>{titleA} <span className="ital">{italicA}</span>{titleEndA ? ` ${titleEndA}` : ""}</h2>
          </div>
          <div className="firm-statements">
            <div className="statement reveal"><h4>Mission</h4><p>{mission}</p></div>
            <div className="statement reveal"><h4>Vision</h4><p>{vision}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */
export function CTASection({ title, italic, titleEnd, sub, primary, secondary }:
  Head & { primary?: CTA; secondary?: CTA }) {
  return (
    <section className="cta-section" id="connect">
      <div className="wrap">
        <div className="cta grain reveal">
          <div className="cta-overlay" />
          <h2>{title} {italic ? <span className="ital">{italic}</span> : null} {titleEnd}</h2>
          {sub ? <p>{sub}</p> : null}
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to={primary?.href || "/contact"}>{primary?.label || "Request a meeting"} <Icon.Arrow /></Link>
            {secondary ? (
              secondary.href.startsWith("tel:") || secondary.href.startsWith("mailto:")
                ? <a className="btn btn-ghost btn-lg" href={secondary.href}>{secondary.label}</a>
                : <Link className="btn btn-ghost btn-lg" to={secondary.href}>{secondary.label}</Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- team grid ---------- */
export interface Person { name: string; role: string; bio?: string; initials?: string }
export function TeamGrid({ kicker, title, italic, titleEnd, sub, people }: Head & { people: Person[] }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead kicker={kicker} title={title} italic={italic} titleEnd={titleEnd} sub={sub} />
        <div className="team-grid" data-grid>
          {people.map((p, i) => (
            <article className="team-card" key={i}>
              <div className="team-photo" style={{ background: "var(--accent-grad)", display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--font-serif)", fontSize: 48, fontStyle: "italic" }}>
                {p.initials || p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="team-meta">
                <h3>{p.name}</h3>
                <div className="team-role">{p.role}</div>
                {p.bio ? <p>{p.bio}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact block (form + info) ---------- */
export function ContactBlock() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "Request a meeting", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    <section className="section contact-section">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="kicker">Get in touch</div>
            <h2>Let's start a <span className="ital">conversation.</span></h2>
            <p className="contact-lead">Tell us about your company, thesis, or deal. Our team responds within two business days.</p>
            <ul className="contact-detail">
              <li><span className="ci"><Icon.Pin /></span><div><b>Offices</b><br />{COMPANY.offices}</div></li>
              <li><span className="ci"><Icon.Phone /></span><div><b>Phone</b><br /><a href={COMPANY.phoneHref}>{COMPANY.phone}</a></div></li>
              <li><span className="ci"><Icon.Mail /></span><div><b>Email</b><br /><a href={COMPANY.emailHref}>{COMPANY.email}</a></div></li>
            </ul>
            <div className="socials">
              <a href={COMPANY.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={COMPANY.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          <div className="contact-form-wrap reveal">
            {done ? (
              <div className="form-done">
                <div className="form-done-ico"><Icon.Check /></div>
                <h3>Thank you.</h3>
                <p>We've received your message and will be in touch within two business days.</p>
                <button className="btn btn-ghost" onClick={() => setDone(false)}>Send another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="field-row">
                  <label className="field"><span>Name</span><input required value={form.name} onChange={set("name")} placeholder="Jane Doe" /></label>
                  <label className="field"><span>Email</span><input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" /></label>
                </div>
                <label className="field"><span>Company</span><input value={form.company} onChange={set("company")} placeholder="Company name" /></label>
                <label className="field"><span>I'm interested in</span>
                  <select value={form.type} onChange={set("type")}>
                    <option>Request a meeting</option>
                    <option>Submit a deal</option>
                    <option>Growth capital</option>
                    <option>Mergers &amp; acquisitions</option>
                    <option>Partnership / other</option>
                  </select>
                </label>
                <label className="field"><span>Message</span><textarea rows={4} value={form.message} onChange={set("message")} placeholder="A few words about your company or thesis…" /></label>
                <button className="btn btn-primary btn-lg" type="submit">Send message <Icon.Arrow /></button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
