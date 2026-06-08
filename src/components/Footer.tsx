import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { COMPANY } from "../data";
import { asset } from "../lib/asset";

const COLS: { h: string; items: [string, string][] }[] = [
  { h: "Capabilities", items: [
    ["Venture Capital", "/private-equity"],
    ["Private Equity", "/private-equity"],
    ["Mergers & Acquisitions", "/mergers-acquisitions"],
    ["Infrastructure", "/infrastructure"],
  ]},
  { h: "Portfolio", items: [
    ["Information Technology", "/portfolio/it"],
    ["Healthcare", "/portfolio/healthcare"],
    ["Retail", "/portfolio/retail"],
    ["Sports & Entertainment", "/portfolio/sports"],
  ]},
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src={asset("vimtra-logo.png")} alt="Vimtra Ventures" />
            <p className="footer-blurb">A global private equity and venture capital firm specializing in corporate finance, M&amp;A, and strategic development across technology, retail, healthcare, real estate, and hospitality.</p>
            <p className="footer-sub">{COMPANY.parent}</p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <ul>{c.items.map(([label, href]) => (<li key={label}><Link to={href}>{label}</Link></li>))}</ul>
            </div>
          ))}
          <div>
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><span className="ci"><Icon.Pin /></span> {COMPANY.offices}</li>
              <li><a href={COMPANY.phoneHref}><span className="ci"><Icon.Phone /></span> {COMPANY.phone}</a></li>
              <li><a href={COMPANY.emailHref}><span className="ci"><Icon.Mail /></span> {COMPANY.email}</a></li>
            </ul>
            <div className="socials">
              <a href={COMPANY.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={COMPANY.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span className="disclaimer">For informational purposes only. Nothing herein constitutes an offer to sell or a solicitation of an offer to buy any security or investment product.</span>
        </div>
      </div>
    </footer>
  );
}
