import { useEffect, useRef, useState } from "react";

interface Props {
  /** Final value like "$450M+", "30+", "100%", "4" — animates the numeric portion. */
  value: string;
  /** Animation length in ms. */
  duration?: number;
  /** Where the animation starts from as a fraction of the target. */
  startFrom?: number;
}

/** Parse "$450M+" → { prefix: "$", num: 450, suffix: "M+" }. */
function parse(value: string): { prefix: string; num: number; suffix: string; raw: string } {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value, raw: value };
  const num = parseFloat(match[2].replace(",", "."));
  return { prefix: match[1], num, suffix: match[3], raw: value };
}

function formatNumber(n: number, raw: string): string {
  // Preserve decimals if the source had them.
  const decimals = (raw.match(/\.(\d+)/) || [, ""])[1].length;
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString();
}

/** easeOutCubic — feels punchy at the start, settles smoothly at the end. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({ value, duration = 1600, startFrom = 0 }: Props) {
  const { prefix, num, suffix, raw } = parse(value);
  const [shown, setShown] = useState<number>(num * startFrom);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(num); return; }

    let rafId = 0;
    const run = () => {
      if (fired.current) return;
      fired.current = true;
      const start = performance.now();
      const from = num * startFrom;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setShown(from + (num - from) * ease(t));
        if (t < 1) rafId = requestAnimationFrame(tick);
        else setShown(num);
      };
      rafId = requestAnimationFrame(tick);
    };

    // Synchronous viewport check — robust against React 18 StrictMode's
    // double-mount cycle, which can cancel an IntersectionObserver before
    // its first callback fires.
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    if (inView()) { run(); return () => cancelAnimationFrame(rafId); }

    if (!("IntersectionObserver" in window)) { run(); return () => cancelAnimationFrame(rafId); }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafId); };
  }, [num, duration, startFrom]);

  return (
    <span ref={ref} className="countup">
      {prefix}<span className="countup-n">{formatNumber(shown, raw)}</span>{suffix}
    </span>
  );
}
