import { useEffect, useState, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { applyAccent, loadSavedAccent, type AccentHex } from "../lib/accents";
import { useReveal, useTilt, useGridHover } from "../lib/hooks";
import { CanvasCursor } from "./CanvasCursor";

interface Props { children: ReactNode }

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
  useEffect(() => { applyAccent(accent); }, [accent]);
  useEffect(() => { document.body.setAttribute("data-cards", "glass"); }, []);
  useReveal();
  useTilt();
  useGridHover();
  useButtonRipple();
  return (
    <>
      <CanvasCursor />
      <Nav accent={accent} onAccent={setAccent} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
