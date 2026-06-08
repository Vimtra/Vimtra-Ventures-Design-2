/**
 * Resolves a public asset path relative to the Vite base URL.
 * In dev: base = "/" → "/images/foo.png"
 * In prod (GitHub Pages): base = "/Vimtra-Ventures-Design-2/" → "/Vimtra-Ventures-Design-2/images/foo.png"
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if present to avoid double slashes
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
