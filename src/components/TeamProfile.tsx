import { useState, type ReactNode } from "react";
import { Icon } from "../lib/icons";

export interface TeamSection { title: string; body: ReactNode }

interface Props {
  name: string;
  role: string;
  bio: string | ReactNode;
  initials?: string;
  /** Optional image src — if missing, an aurora-gradient initials tile is rendered. */
  photoSrc?: string;
  reverse?: boolean;
  sections?: TeamSection[];
}

export function TeamProfile({ name, role, bio, initials, photoSrc, reverse, sections }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const derived = initials || name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <section className="section team-profile-section">
      <div className="wrap">
        <div className={"team-profile" + (reverse ? " reverse" : "")}>
          <div className="team-profile-photo-wrap reveal">
            <div className="team-profile-photo" data-tilt="4">
              {photoSrc
                ? <img src={photoSrc} alt={name} />
                : <span className="team-profile-initials">{derived}</span>}
              <div className="team-profile-photo-glow" />
            </div>
            <div className="team-profile-frame" />
          </div>
          <div className="team-profile-meta reveal">
            <h2 className="team-profile-name">{name}</h2>
            <p className="team-profile-role">{role}</p>
            <div className="team-profile-divider" />
            <div className="team-profile-bio">
              {typeof bio === "string" ? <p>{bio}</p> : bio}
            </div>
            {sections && sections.length > 0 ? (
              <div className="team-accordion">
                {sections.map((s, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={i} className={"team-accordion-item" + (isOpen ? " open" : "")}>
                      <button
                        type="button"
                        className="team-accordion-btn"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <span>{s.title}</span>
                        <span className="team-accordion-icon"><Icon.Chevron /></span>
                      </button>
                      <div className="team-accordion-body" hidden={!isOpen}>
                        <div className="team-accordion-inner">{s.body}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
