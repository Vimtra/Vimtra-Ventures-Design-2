import { useEffect, useRef } from "react";

/* ============================================================
   FireBackground — WebGL fragment-shader fire / aurora.
   Upward-flowing fbm-noise flame anchored at the floor of the
   hero, with embers rising and a soft warm halo. Driven by the
   active accent (so Aurora Blossom = magenta flame, Solar Gold
   = orange, Sapphire = blue, etc.).
   ============================================================ */

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_accent;
uniform vec2 u_mouse;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Normalize coordinates so y=0 sits at the canvas midline,
  // negative-y is below (where the fire emanates from) and the
  // unit is one viewport-height. x is centered on the canvas.
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float t = u_time;

  /* Flame distortion — fbm scrolling upward (subtract t·v from y) */
  vec2 flow = vec2(p.x * 1.6, p.y * 1.3 + t * 0.55);
  float fn = fbm(flow);
  fn += 0.55 * fbm(flow * 2.2 + vec2(t * 0.08, t * 0.4));

  /* Vertical mask — fire is born at the floor and rises. The
     fbm noise displaces the height to make the upper edge wavy. */
  float vertical = smoothstep(-0.55, 0.55, -p.y - fn * 0.45);

  /* Horizontal mask — wider at the bottom, narrowing in the
     middle, fading at the edges (a gentle gaussian on x). */
  float horizontal = exp(-pow(p.x * 1.25, 2.0));

  /* Combined flame intensity */
  float fire = vertical * horizontal * (0.55 + 0.45 * fn);
  fire = pow(fire, 1.35);

  /* Color gradient: deep accent → bright accent → white-hot core */
  vec3 col_cool  = u_accent * 0.45;
  vec3 col_warm  = u_accent * 1.05;
  vec3 col_hot   = mix(u_accent, vec3(1.0), 0.7);
  vec3 col_white = vec3(1.0, 0.96, 0.90);

  vec3 color = mix(col_cool, col_warm, fire);
  color = mix(color, col_hot, pow(fire, 2.0));
  color = mix(color, col_white, pow(fire, 7.0));
  color *= fire;

  /* Soft floor halo — the warm "glow on the ground" */
  float halo = exp(-(p.y + 0.7) * 1.85) * exp(-pow(p.x * 1.1, 2.0)) * 0.5;
  color += u_accent * halo * 0.6;

  /* Background — deep neutral with a faint accent tint at the bottom */
  vec3 bg = vec3(0.022, 0.022, 0.028);
  bg += u_accent * 0.03 * pow(1.0 - uv.y, 2.0);

  color = bg + color;

  /* Embers — sparse bright dots drifting upward, fading as they rise */
  vec2 ember_p = p * vec2(7.5, 5.5);
  ember_p.y += t * 1.4;
  vec2 ember_id = floor(ember_p);
  float ember_h = hash(ember_id);
  if (ember_h > 0.991) {
    vec2 ember_f = fract(ember_p) - 0.5;
    float ember_intensity = (ember_h - 0.991) / 0.009;
    float ember_dist = dot(ember_f, ember_f);
    float ember_glow = exp(-ember_dist * 70.0) * ember_intensity;
    /* fade as they rise above the flame top */
    ember_glow *= smoothstep(0.6, -0.35, p.y);
    color += (u_accent * 2.0 + vec3(1.0, 0.78, 0.42)) * ember_glow * 0.55;
  }

  /* Subtle pointer bloom */
  float md = length(p - u_mouse);
  color += u_accent * exp(-md * 4.2) * 0.12;

  /* Reinhard tone map + gamma */
  color = color / (1.0 + color);
  color = pow(color, vec3(1.0 / 2.2));

  gl_FragColor = vec4(color, 1.0);
}
`;

export function FireBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) { canvas.style.display = "none"; return; }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("[fire] shader error:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_time = gl.getUniformLocation(prog, "u_time");
    const u_accent = gl.getUniformLocation(prog, "u_accent");
    const u_mouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left - rect.width / 2) / rect.height;
      mouse.ty = -(e.clientY - rect.top - rect.height / 2) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0, start = performance.now(), elapsed = 0, running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) { start = performance.now() - elapsed; loop(); }
      else { cancelAnimationFrame(raf); }
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      elapsed = performance.now() - start;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const acc = window.__accentRGB || [0.913, 0.290, 0.549];
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, elapsed * 0.001);
      gl.uniform3f(u_accent, acc[0], acc[1], acc[2]);
      gl.uniform2f(u_mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="fire-canvas" aria-hidden="true" />;
}
