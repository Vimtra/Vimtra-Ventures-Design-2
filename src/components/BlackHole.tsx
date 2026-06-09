import type { CSSProperties } from "react";

/* ============================================================
   BlackHole — Interstellar-style cinematic centerpiece.
   Pure CSS + SVG. The disk is rendered as a 3D-tilted ring and
   the gravitationally-lensed back of the disk arches above the
   event horizon. Every layer tunes to --accent / --glow-rgb so
   it retunes on theme change.
   ============================================================ */

const DUST = Array.from({ length: 60 }, (_, i) => i);

export function BlackHole() {
  return (
    <div className="bh-stage" aria-hidden="true">
      {/* deep starfield pulled into the lens */}
      <div className="bh-stars-far" />

      {/* large soft halo */}
      <div className="bh-halo" />

      {/* gravitationally-lensed arch — the back of the disk
          visible above the event horizon due to light bending */}
      <div className="bh-arch">
        <div className="bh-arch-inner" />
      </div>

      {/* tilted accretion disk (3D perspective) */}
      <div className="bh-disk-wrap">
        <div className="bh-disk">
          <div className="bh-disk-band" />
          <div className="bh-disk-band bh-disk-band-2" />
        </div>
      </div>

      {/* photon ring — thin bright halo just outside the horizon */}
      <div className="bh-photon" />

      {/* event horizon — pure void */}
      <div className="bh-horizon" />

      {/* faint relativistic gleam */}
      <div className="bh-gleam" />

      {/* orbital dust trailing the disk */}
      <div className="bh-dust">
        {DUST.map((i) => {
          const angle = (i / DUST.length) * 360;
          const radius = 200 + ((i * 41) % 110);
          const dur = 4 + ((i * 7) % 6);
          const delay = (i * 0.15) % 6;
          const size = 1 + (i % 3);
          return (
            <span
              key={i}
              style={{
                "--a": `${angle}deg`,
                "--r": `${radius}px`,
                "--d": `${dur}s`,
                "--delay": `${delay}s`,
                "--size": `${size}px`,
              } as CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}
