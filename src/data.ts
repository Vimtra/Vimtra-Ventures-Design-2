export interface NavItem { label: string; href: string; children?: NavItem[]; }

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "M&A", href: "/mergers-acquisitions" },
  { label: "Private Equity", href: "/private-equity" },
  {
    label: "Portfolio", href: "/portfolio", children: [
      { label: "Information Technology", href: "/portfolio/it" },
      { label: "Retail", href: "/portfolio/retail" },
      { label: "Healthcare", href: "/portfolio/healthcare" },
      { label: "Sports Franchise", href: "/portfolio/sports" },
    ],
  },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Teams", href: "/teams" },
  { label: "Contact", href: "/contact" },
];

export const COMPANY = {
  name: "Vimtra Ventures",
  email: "info@vimtra.com",
  emailHref: "mailto:info@vimtra.com",
  offices: "New York · San Francisco · Dallas · India",
  parent: "A subsidiary of Urpan Technologies Inc.",
  socials: {
    linkedin: "https://www.linkedin.com/company/vimtra-ventures/",
    instagram: "https://www.instagram.com/vimtra_ventures/",
    facebook: "https://www.facebook.com/profile.php/?id=100078611386991",
  },
};
