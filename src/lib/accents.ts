export type AccentHex = "#e94a8c" | "#7c5cff" | "#2dd4bf" | "#f5a524" | "#3b82f6" | "#e21414";

export interface AccentPreset {
  deep: string;
  rgb: string;
  ink: string;
  label: string;
  grad: string;
}

export const ACCENTS: Record<AccentHex, AccentPreset> = {
  "#e94a8c": { deep: "#b8367a", rgb: "233, 74, 140", ink: "#ffffff", label: "Aurora Blossom", grad: "linear-gradient(135deg,#ff7eb3 0%,#e94a8c 40%,#8a4dff 100%)" },
  "#7c5cff": { deep: "#5b3fd6", rgb: "124, 92, 255", ink: "#ffffff", label: "Royal Indigo",   grad: "linear-gradient(135deg,#a78bfa 0%,#7c5cff 50%,#3b2fa8 100%)" },
  "#2dd4bf": { deep: "#0f9488", rgb:  "45, 212, 191", ink: "#031f1c", label: "Emerald Mist",  grad: "linear-gradient(135deg,#5eead4 0%,#2dd4bf 50%,#0f766e 100%)" },
  "#f5a524": { deep: "#b6730a", rgb: "245, 165, 36",  ink: "#1f1305", label: "Solar Gold",    grad: "linear-gradient(135deg,#fcd34d 0%,#f5a524 50%,#b45309 100%)" },
  "#3b82f6": { deep: "#1d4ed8", rgb:  "59, 130, 246", ink: "#ffffff", label: "Sapphire",      grad: "linear-gradient(135deg,#60a5fa 0%,#3b82f6 50%,#1e3a8a 100%)" },
  "#e21414": { deep: "#a60c0c", rgb: "226, 32, 32",   ink: "#ffffff", label: "Royal Red",     grad: "linear-gradient(135deg,#ff4d4d 0%,#e21414 50%,#7a0606 100%)" },
};

export const ACCENT_ORDER: AccentHex[] = ["#e94a8c", "#7c5cff", "#2dd4bf", "#f5a524", "#3b82f6", "#e21414"];
export const DEFAULT_ACCENT: AccentHex = "#e94a8c";
const STORAGE_KEY = "vimtra:accent";

declare global { interface Window { __accentRGB?: number[]; } }

export function applyAccent(hex: AccentHex) {
  const a = ACCENTS[hex] || ACCENTS[DEFAULT_ACCENT];
  const r = document.documentElement.style;
  r.setProperty("--accent", hex);
  r.setProperty("--accent-deep", a.deep);
  r.setProperty("--accent-ink", a.ink);
  r.setProperty("--glow-rgb", a.rgb);
  r.setProperty("--accent-grad", a.grad);
  window.__accentRGB = a.rgb.split(",").map((n) => parseFloat(n) / 255);
  try { localStorage.setItem(STORAGE_KEY, hex); } catch {}
}

export function loadSavedAccent(): AccentHex {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as AccentHex | null;
    if (saved && ACCENTS[saved]) return saved;
  } catch {}
  return DEFAULT_ACCENT;
}
