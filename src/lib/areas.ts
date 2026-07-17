import { Icon } from "./icons";
import type { AccentHex } from "./accents";

/**
 * Single source of truth for the business "areas" Vimtra Ventures operates in.
 *
 * Drives three things introduced in the CEO redesign:
 *   1. The tile grid on the Home page (portfolio visible "at one shot").
 *   2. Per-area accent colour + wayfinding rail (which area am I in).
 *   3. The breadcrumb / tile-home + site-home buttons on every area page.
 */
export interface Area {
  key: string;
  /** Full label used on tiles and headings. */
  label: string;
  /** Short label used on the vertical wayfinding rail. */
  short: string;
  /** One-line essence shown on the tile. */
  tagline: string;
  /** The tile's landing page. */
  href: string;
  /** Hub to return to via the "tile home" button (defaults to href). */
  hub?: { label: string; href: string };
  /** Distinct accent colour — the wayfinding identity for this area. */
  accent: AccentHex;
  /** Lucide-style glyph. */
  icon: (typeof Icon)[keyof typeof Icon];
  /** Half-visible essence image behind the tile / area hero. */
  image: string;
  /** Where this tile sits in the bento grid (desktop). */
  span: "wide" | "third" | "half";
}

export const AREAS: Area[] = [
  {
    key: "pe",
    label: "Private Equity & Venture Capital",
    short: "Private Equity",
    tagline: "Patient capital and operating know-how for companies built to compound.",
    href: "/private-equity",
    accent: "#f5a524",
    icon: Icon.Growth,
    image: "images/private-equity.jpg",
    span: "wide",
  },
  {
    key: "ma",
    label: "Mergers & Acquisitions",
    short: "M & A",
    tagline: "Sell-side, buy-side, and cross-border deals structured to last.",
    href: "/mergers-acquisitions",
    accent: "#3b82f6",
    icon: Icon.Merge,
    image: "images/mergers&acquisitions.jpg",
    span: "wide",
  },
  {
    key: "it",
    label: "Information Technology",
    short: "Technology",
    tagline: "30+ software, services, and AI companies owned and operated.",
    href: "/portfolio/it",
    hub: { label: "Portfolio", href: "/portfolio" },
    accent: "#7c5cff",
    icon: Icon.Chip,
    image: "images/portfolio_it.png",
    span: "third",
  },
  {
    key: "healthcare",
    label: "Healthcare",
    short: "Healthcare",
    tagline: "Backing better clinical outcomes, access, and cost across care.",
    href: "/portfolio/healthcare",
    hub: { label: "Portfolio", href: "/portfolio" },
    accent: "#2dd4bf",
    icon: Icon.Heart,
    image: "images/portfolio_healthcare.png",
    span: "third",
  },
  {
    key: "retail",
    label: "Retail",
    short: "Retail",
    tagline: "Differentiated consumer brands and omnichannel experiences.",
    href: "/portfolio/retail",
    hub: { label: "Portfolio", href: "/portfolio" },
    accent: "#e94a8c",
    icon: Icon.Cart,
    image: "images/portfolio_retail.png",
    span: "third",
  },
  {
    key: "sports",
    label: "Sports & Entertainment",
    short: "Sports",
    tagline: "Golf communities, soccer franchises, and live entertainment IP.",
    href: "/portfolio/sports",
    hub: { label: "Portfolio", href: "/portfolio" },
    accent: "#e21414",
    icon: Icon.Trophy,
    image: "images/portfolio_sports.png",
    span: "half",
  },
  {
    key: "infrastructure",
    label: "Infrastructure & Real Estate",
    short: "Real Estate",
    tagline: "$1.1B of real estate and mission-critical infrastructure in build.",
    href: "/infrastructure",
    accent: "#f97316",
    icon: Icon.Building,
    image: "images/infra_rendering.png",
    span: "half",
  },
];

/** Resolve the active area for a given route (for accent theming + rail). */
export function areaForPath(pathname: string): Area | undefined {
  // Exact area landings and their nested pages.
  return AREAS.find((a) => pathname === a.href || pathname.startsWith(a.href + "/"))
    // /portfolio itself has no single accent — treat as neutral hub.
    ?? undefined;
}

/** The tile-home target for a page (the area's hub, or the area itself). */
export function tileHomeFor(area: Area): { label: string; href: string } {
  return area.hub ?? { label: area.label, href: area.href };
}
