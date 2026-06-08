import { useEffect, useRef, useState } from "react";
import { ACCENTS, ACCENT_ORDER, type AccentHex } from "../lib/accents";

interface Props { value: AccentHex; onChange: (v: AccentHex) => void; }

export function ThemeSwitcher({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const active = ACCENTS[value] || ACCENTS["#e94a8c"];
  return (
    <div className="theme-switch" ref={ref}>
      <button className="theme-btn" aria-label="Change site colour" aria-expanded={open}
              onClick={() => setOpen((o) => !o)}>
        <span className="theme-swatch" style={{ background: active.grad }} />
        <span className="theme-btn-label">Theme</span>
      </button>
      <div className={"theme-pop" + (open ? " show" : "")} role="menu">
        <div className="theme-pop-h">Site palette</div>
        <div className="theme-grid">
          {ACCENT_ORDER.map((hex) => {
            const a = ACCENTS[hex];
            const sel = hex === value;
            return (
              <button key={hex} className={"theme-chip" + (sel ? " active" : "")}
                      style={{ background: a.grad }} aria-label={a.label}
                      onClick={() => { onChange(hex); setOpen(false); }}>
                <span className="theme-chip-tick">✓</span>
                <span className="theme-chip-name">{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
