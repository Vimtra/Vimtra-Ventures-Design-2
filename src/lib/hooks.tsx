import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Add `.in` to anything tagged with `.reveal`, `[data-stagger]`, or `[data-grid]`
 *  the first time it enters the viewport. Re-runs after each route change. */
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, [data-stagger], [data-grid]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

/** 3D pointer-tilt on any element with `[data-tilt="<deg>"]`. */
export function useTilt() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(hover: none)").matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups = cards.map((card) => {
      // Avoid clashing with the unified grid hover effect
      if (card.closest("[data-grid]") || card.closest(".cards")) return () => {};

      const max = parseFloat(card.getAttribute("data-tilt") || "7") || 7;
      let raf: number | null = null;
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
          card.style.setProperty("--mx", (px * 100 + 50) + "%");
          card.style.setProperty("--my", (py * 100 + 50) + "%");
        });
      };
      const onLeave = () => { if (raf) cancelAnimationFrame(raf); card.style.transform = ""; };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => { card.removeEventListener("pointermove", onMove); card.removeEventListener("pointerleave", onLeave); };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);
}

/** Coordinated 3D grid tilt + hover coordinates sharing across card borders. */
export function useGridHover() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(hover: none)").matches) return;

    const grids = Array.from(document.querySelectorAll<HTMLElement>("[data-grid], .cards"));

    const cleanups = grids.map((grid) => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(".comp-card, .card, .sector-tile"));

      const onMove = (e: PointerEvent) => {
        grid.style.setProperty("--grid-active", "1");

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Expose raw coordinates for background glare gradients
          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);

          // Distance from card center to pointer
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);

          const maxTilt = parseFloat(card.getAttribute("data-tilt") || "5") || 5;
          const influence = 400; // Radius of 3D tilt pull (in pixels)

          if (dist < influence) {
            const factor = 1 - dist / influence; // 1 at center, 0 at edge
            const px = dx / (rect.width * 1.5);
            const py = dy / (rect.height * 1.5);

            card.style.transform = `perspective(900px) rotateX(${(-py * maxTilt * factor).toFixed(2)}deg) rotateY(${(px * maxTilt * factor).toFixed(2)}deg) translateY(${-5 * factor}px)`;
            card.style.borderColor = `rgba(var(--glow-rgb), ${0.1 + factor * 0.32})`;
          } else {
            card.style.transform = "";
            card.style.borderColor = "";
          }
        });
      };

      const onLeave = () => {
        grid.style.setProperty("--grid-active", "0");
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.borderColor = "";
          card.style.removeProperty("--mx");
          card.style.removeProperty("--my");
        });
      };

      grid.addEventListener("pointermove", onMove, { passive: true });
      grid.addEventListener("pointerleave", onLeave);

      return () => {
        grid.removeEventListener("pointermove", onMove);
        grid.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);
}

