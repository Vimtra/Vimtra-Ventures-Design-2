import type { SVGProps } from "react";

const s: SVGProps<SVGSVGElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Icon = {
  Arrow: (p: SVGProps<SVGSVGElement>) => (<svg width={16} height={16} viewBox="0 0 24 24" {...s} {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  Check: (p: SVGProps<SVGSVGElement>) => (<svg width={15} height={15} viewBox="0 0 24 24" {...s} {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  Rocket: (p: SVGProps<SVGSVGElement>) => (<svg width={22} height={22} viewBox="0 0 24 24" {...s} {...p}><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2M9 13a10 10 0 0 1 9-9c.6 4-1 8-7 11l-2-2z"/><circle cx="14.5" cy="8.5" r="1.3"/></svg>),
  Growth: (p: SVGProps<SVGSVGElement>) => (<svg width={22} height={22} viewBox="0 0 24 24" {...s} {...p}><path d="M3 17l5-5 4 4 8-9"/><path d="M16 7h4v4"/></svg>),
  Merge: (p: SVGProps<SVGSVGElement>) => (<svg width={22} height={22} viewBox="0 0 24 24" {...s} {...p}><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="12" r="2.4"/><path d="M8.4 6.5C12 8 12 12 15.6 12M8.4 17.5C12 16 12 12 15.6 12"/></svg>),
  Shield: (p: SVGProps<SVGSVGElement>) => (<svg width={22} height={22} viewBox="0 0 24 24" {...s} {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>),
  Building: (p: SVGProps<SVGSVGElement>) => (<svg width={18} height={18} viewBox="0 0 24 24" {...s} {...p}><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6"/></svg>),
  Globe: (p: SVGProps<SVGSVGElement>) => (<svg width={18} height={18} viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>),
  Briefcase: (p: SVGProps<SVGSVGElement>) => (<svg width={18} height={18} viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></svg>),
  Doc: (p: SVGProps<SVGSVGElement>) => (<svg width={18} height={18} viewBox="0 0 24 24" {...s} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>),
  Chip: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/></svg>),
  Trophy: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M7 4h10v4a5 5 0 0 1-10 0V4zM5 5H3v2a3 3 0 0 0 3 3M19 5h2v2a3 3 0 0 1-3 3M9 18h6M10 18v-2M14 18v-2M8 21h8"/></svg>),
  Spark: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>),
  Refresh: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>),
  Bed: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M3 7v10M3 11h18v6M21 17v-4a2 2 0 0 0-2-2h-7v4M7 11a2 2 0 1 0 0-.01"/></svg>),
  Cart: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.4a1 1 0 0 0 1-.8L21 8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>),
  Heart: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>),
  Pin: (p: SVGProps<SVGSVGElement>) => (<svg width={15} height={15} viewBox="0 0 24 24" {...s} {...p}><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  Phone: (p: SVGProps<SVGSVGElement>) => (<svg width={15} height={15} viewBox="0 0 24 24" {...s} {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>),
  Mail: (p: SVGProps<SVGSVGElement>) => (<svg width={15} height={15} viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>),
  VMark: (p: SVGProps<SVGSVGElement>) => (<svg width={26} height={26} viewBox="0 0 24 24" {...p}><path d="M4 5l8 14 8-14h-5l-3 5.5L7 5z" fill="currentColor"/></svg>),
  Chevron: (p: SVGProps<SVGSVGElement>) => (<svg width={13} height={13} viewBox="0 0 24 24" {...s} {...p}><path d="m6 9 6 6 6-6"/></svg>),
  Menu: (p: SVGProps<SVGSVGElement>) => (<svg width={20} height={20} viewBox="0 0 24 24" {...s} {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  Close: (p: SVGProps<SVGSVGElement>) => (<svg width={22} height={22} viewBox="0 0 24 24" {...s} {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>),
};
