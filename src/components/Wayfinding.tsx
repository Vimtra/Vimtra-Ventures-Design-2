import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { tileHomeFor, type Area } from "../lib/areas";

/** Human labels for the neutral interior pages that aren't coloured areas. */
const PAGE_LABELS: Record<string, string> = {
  "/portfolio": "Portfolio",
  "/teams": "Teams",
  "/contact": "Contact",
};

interface Props {
  /** Present on the seven coloured business areas — drives the rail + colour. */
  area?: Area;
  /** Current route, used to label neutral interior pages. */
  pathname: string;
}

/**
 * Wayfinding for every interior page (CEO asks 3, 5 & 6):
 *
 *  • On the seven business areas: a fixed ¾-height vertical rail on the left in
 *    the area's colour with the area name — a constant "which area am I in" cue —
 *    plus a breadcrumb (Site-home + Tile-home + current area).
 *  • On neutral pages (Portfolio hub, Teams, Contact): the same breadcrumb with a
 *    Site-home button, so every page can get back one level and to the top.
 */
export function Wayfinding({ area, pathname }: Props) {
  const tile = area ? tileHomeFor(area) : null;
  const atHub = !tile || tile.href === area!.href;
  const AreaIcon = area?.icon;
  const hereLabel = area ? area.label : PAGE_LABELS[pathname];

  return (
    <>
      {/* ¾-height vertical wayfinding rail — coloured areas only */}
      {area ? (
        <div className="way-rail" aria-hidden="true">
          <span className="way-rail-bar" />
          <span className="way-rail-label">{area.short}</span>
        </div>
      ) : null}

      {/* Breadcrumb: site home + tile home + current page */}
      <div className={"way-crumb" + (area ? "" : " neutral")}>
        <div className="wrap way-crumb-inner">
          <Link className="way-btn" to="/">
            <Icon.Home /> <span>Home</span>
          </Link>
          {area && !atHub && tile ? (
            <>
              <span className="way-sep">/</span>
              <Link className="way-btn" to={tile.href}>
                <Icon.Grid /> <span>{tile.label}</span>
              </Link>
            </>
          ) : null}
          {hereLabel ? (
            <>
              <span className="way-sep">/</span>
              <span className="way-here">
                {AreaIcon ? <AreaIcon /> : null} <span>{hereLabel}</span>
              </span>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
