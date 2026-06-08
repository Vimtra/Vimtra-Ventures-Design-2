import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV, type NavItem } from "../data";
import { Icon } from "../lib/icons";
import { ThemeSwitcher } from "./ThemeSwitcher";
import type { AccentHex } from "../lib/accents";

function isActive(item: NavItem, pathname: string) {
  if (item.href === pathname) return true;
  if (item.children) return item.children.some((c) => c.href === pathname)
    || (item.href === "/portfolio" && pathname.startsWith("/portfolio"));
  return false;
}

interface Props { accent: AccentHex; onAccent: (v: AccentHex) => void; }

export function Nav({ accent, onAccent }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <div className={"nav-shell" + (scrolled ? " scrolled" : "")}>
        <nav className="nav">
          <NavLink className="brand nav-anim-logo" to="/" aria-label="Vimtra Ventures home" style={{ animationDelay: "0.35s" }}>
            <img className="brand-logo" src="/vimtra-logo.png" alt="Vimtra Ventures" />
          </NavLink>
          <div className="nav-links">
            {NAV.map((l, i) => (
              l.children ? (
                <div className="nav-drop nav-anim-link" key={l.label}
                     style={{ animationDelay: `${0.42 + i * 0.08}s` }}
                     onMouseEnter={() => setDrop(true)}
                     onMouseLeave={() => setDrop(false)}>
                  <NavLink to={l.href} className={() => isActive(l, pathname) ? "active" : ""}>
                    {l.label} <Icon.Chevron />
                  </NavLink>
                  <div className={"dropdown" + (drop ? " show" : "")}>
                    {l.children.map((c) => (
                      <NavLink key={c.href} to={c.href} className={({ isActive }) => isActive ? "active" : ""}>
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink 
                  key={l.href} 
                  to={l.href} 
                  style={{ animationDelay: `${0.42 + i * 0.08}s` }}
                  className={({ isActive }) => (isActive ? "active " : "") + "nav-anim-link"}
                >
                  {l.label}
                </NavLink>
              )
            ))}
          </div>
          <div className="nav-cta nav-anim-cta" style={{ animationDelay: `${0.42 + NAV.length * 0.08 + 0.12}s` }}>
            <ThemeSwitcher value={accent} onChange={onAccent} />
            <NavLink className="btn btn-primary" to="/contact">Request a meeting <Icon.Arrow /></NavLink>
            <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(true)}><Icon.Menu /></button>
          </div>
        </nav>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        <button className="nav-burger" style={{ position: "absolute", top: 22, right: 22, display: "inline-flex" }}
                aria-label="Close" onClick={() => setOpen(false)}><Icon.Close /></button>
        {NAV.map((l) => (
          <NavLink key={l.label} to={l.href} className={() => isActive(l, pathname) ? "active" : ""}>{l.label}</NavLink>
        ))}
        <NavLink className="btn btn-primary btn-lg" to="/contact">Request a meeting <Icon.Arrow /></NavLink>
      </div>
    </>
  );
}
