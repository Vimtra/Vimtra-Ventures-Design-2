import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Wayfinding } from "./Wayfinding";
import { applyAccent, loadSavedAccent, DEFAULT_ACCENT, type AccentHex } from "../lib/accents";
import { areaForPath } from "../lib/areas";
import { useReveal, useTilt, useGridHover } from "../lib/hooks";
import { CanvasCursor } from "./CanvasCursor";

interface Props { children: ReactNode }

/** Staged intro on the first visit of the session — nav slides in,
 *  then the hero background fades in, then headline/sub/buttons cascade.
 *  Skipped on subsequent SPA navigations so it doesn't feel repetitive.
 *
 *  Idempotency lives entirely in sessionStorage so React 18 StrictMode's
 *  dev-mode double-invoke is safe and Vite's React-Fast-Refresh module
 *  preservation can't trap us in a stuck state. The timeout intentionally
 *  has no cleanup — if it runs after unmount, removing an already-absent
 *  class is a no-op. */
function useFirstVisitIntro() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("vimtra:introSeen")) return;
      sessionStorage.setItem("vimtra:introSeen", "1");
    } catch { /* sessionStorage blocked — still play the intro */ }
    document.body.classList.add("intro-first-load");
    setTimeout(() => {
      document.body.classList.remove("intro-first-load");
    }, 3200);
  }, []);
}

/** Position the ripple at the actual click point and restart the animation. */
function useButtonRipple() {
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      btn.style.setProperty("--mx", `${mx}%`);
      btn.style.setProperty("--my", `${my}%`);
      btn.classList.remove("btn-rippling");
      // force a reflow so the animation restarts even on rapid repeat clicks
      void btn.offsetWidth;
      btn.classList.add("btn-rippling");
      const clear = () => btn.classList.remove("btn-rippling");
      btn.addEventListener("animationend", clear, { once: true });
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
}

export function PageShell({ children }: Props) {
  const [accent, setAccent] = useState<AccentHex>(loadSavedAccent());
  const { pathname } = useLocation();
  const area = areaForPath(pathname);

  // Brand theme is locked to gold across the whole site. The active area still
  // drives the wayfinding rail + breadcrumb label (which area am I in), but the
  // colour stays gold everywhere — the other accents are kept hidden.
  useEffect(() => {
    applyAccent(DEFAULT_ACCENT);
    document.body.setAttribute("data-area", area ? area.key : "");
    return () => { document.body.removeAttribute("data-area"); };
  }, [area]);

  useEffect(() => { document.body.setAttribute("data-cards", "glass"); }, []);
  useReveal();
  useTilt();
  useGridHover();
  useButtonRipple();
  useFirstVisitIntro();
  return (
    <>
      <CanvasCursor />
      <Nav accent={accent} onAccent={setAccent} />
      {pathname !== "/" ? <Wayfinding area={area} pathname={pathname} /> : null}
      <main>{children}</main>
      <Footer />
    </>
  );
}
