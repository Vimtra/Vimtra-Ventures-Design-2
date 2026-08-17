export interface NavItem { label: string; href: string; icon?: string; children?: NavItem[]; }

export const NAV: NavItem[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "M&A", href: "/mergers-acquisitions", icon: "Merge" },
  { label: "Private Equity", href: "/private-equity", icon: "Growth" },
  {
    label: "Portfolio", href: "/portfolio", icon: "Grid", children: [
      { label: "Information Technology", href: "/portfolio/it", icon: "Chip" },
      { label: "Retail", href: "/portfolio/retail", icon: "Cart" },
      { label: "Healthcare", href: "/portfolio/healthcare", icon: "Heart" },
      { label: "Sports Franchise", href: "/portfolio/sports", icon: "Trophy" },
    ],
  },
  { label: "Infrastructure", href: "/infrastructure", icon: "Building" },
  { label: "Teams", href: "/teams", icon: "Users" },
  { label: "Contact", href: "/contact", icon: "Mail" },
];

export const COMPANY = {
  name: "Vimtra Ventures",
  email: "info@vimtra.com",
  emailHref: "mailto:info@vimtra.com",
  offices: "New York · San Francisco · Dallas · India",
  socials: {
    linkedin: "https://www.linkedin.com/company/vimtra-ventures/",
    instagram: "https://www.instagram.com/vimtra_ventures/",
    facebook: "https://www.facebook.com/profile.php/?id=100078611386991",
  },
};
