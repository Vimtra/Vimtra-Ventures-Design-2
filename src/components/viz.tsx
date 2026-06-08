import type { ReactNode } from "react";
import { Icon } from "../lib/icons";

export function VizRadar({ icon }: { icon?: ReactNode }) {
  return (
    <div className="viz">
      <div className="radar">
        {[56, 104, 152].map((s, i) => (<div key={i} className="ring2" style={{ width: s, height: s }} />))}
        <div className="sweep" />
        <div className="blip" style={{ top: "30%", left: "62%" }} />
        <div className="blip" style={{ top: "64%", left: "38%" }} />
        <div className="blip" style={{ top: "44%", left: "74%" }} />
        <div className="core">{icon || <Icon.Rocket />}</div>
      </div>
    </div>
  );
}

export function VizNodes() {
  return (
    <div className="viz">
      <svg className="node-lines" viewBox="0 0 320 188" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ln" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {[34, 78, 122, 166].map((y, i) => (
          <path key={i} d={`M56 ${y} C 130 ${y}, 150 94, 232 94`}
                stroke="url(#ln)" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
        ))}
      </svg>
      <div className="nodes">
        <div className="node-col">
          <div className="node"><Icon.Building /></div>
          <div className="node"><Icon.Globe /></div>
          <div className="node"><Icon.Briefcase /></div>
          <div className="node"><Icon.Doc /></div>
        </div>
        <div className="node-hub"><Icon.VMark /></div>
      </div>
    </div>
  );
}

export function VizChart({ label }: { label?: string }) {
  return (
    <div className="viz">
      <span className="chart-pill">
        <Icon.Arrow style={{ transform: "rotate(-45deg)" }} /> {label || "Cross-border"}
      </span>
      <svg viewBox="0 0 320 188" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.34" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 150 C 50 140, 70 120, 110 128 C 150 136, 165 86, 205 78 C 245 70, 270 40, 320 26 L320 188 L0 188 Z" fill="url(#fill)" />
        <path d="M0 150 C 50 140, 70 120, 110 128 C 150 136, 165 86, 205 78 C 245 70, 270 40, 320 26"
              fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
