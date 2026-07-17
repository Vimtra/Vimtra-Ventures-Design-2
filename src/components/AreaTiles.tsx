import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { AREAS } from "../lib/areas";
import { asset } from "../lib/asset";

/**
 * The tiled home grid (CEO asks 1, 2, 3 & 4): every area Vimtra operates in is a
 * tile on one page, so the diversity of the portfolio is visible "at one shot."
 * Each tile carries a ¾-length wayfinding bar and a half-visible essence image,
 * and links straight into that area's detail page. The theme is locked to gold,
 * so titles and bars use the brand accent rather than per-area colours.
 */
export function AreaTiles() {
  return (
    <section className="section area-tiles-section" id="areas">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker">What we do</div>
          <h2>One firm, a <span className="ital">diversified</span> footprint.</h2>
          <p>Every area we operate in, on a single canvas. Pick a tile to go deeper.</p>
        </div>

        <div className="area-grid" data-grid="ae-spring">
          {AREAS.map((a) => {
            const AreaIcon = a.icon;
            return (
              <Link
                key={a.key}
                to={a.href}
                className={"area-tile " + a.span}
                data-tilt="4"
                aria-label={a.label}
              >
                <div
                  className="area-tile-bg"
                  style={{ backgroundImage: `url(${asset(a.image)})` }}
                />
                <div className="area-tile-glow" />
                <div className="area-tile-top">
                  <span className="area-tile-ico"><AreaIcon /></span>
                </div>
                <div className="area-tile-meta">
                  <h3>{a.label}</h3>
                  <p>{a.tagline}</p>
                </div>
                <span className="area-tile-go">
                  Explore <Icon.Arrow />
                </span>
                {/* ¾-length wayfinding bar in the area's colour */}
                <span className="area-tile-bar" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
