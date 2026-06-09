import { useEffect, useRef } from "react";

/* ============================================================
   BlackHole — ray-traced WebGL fragment shader.
   Renders a Schwarzschild-style black hole with a tilted
   accretion disk, gravitationally-lensed rear-disk arch (the
   Interstellar look), Doppler asymmetry, a bright photon ring,
   and a lensed starfield behind. All driven by the active
   --glow-rgb accent.

   Single fullscreen-quad pass via 3 vertices — no Three.js
   needed, no extra bundle weight.
   ============================================================ */

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_accent;
uniform vec2 u_mouse;

const float PI = 3.14159265359;

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
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.2;
    a *= 0.5;
  }
  return v;
}

/* Layered starfield — three densities, twinkling */
vec3 sampleStars(vec2 uv){
  vec3 c = vec3(0.0);
  for (int layer = 0; layer < 3; layer++) {
    float fl = float(layer);
    float scale = 80.0 + fl * 60.0;
    vec2 sp = uv * scale + vec2(fl * 13.7, fl * 7.3);
    vec2 id = floor(sp);
    vec2 fp = fract(sp) - 0.5;
    float h = hash(id);
    if (h > 0.989) {
      float d2 = dot(fp, fp);
      float intensity = (h - 0.989) / 0.011;
      float twinkle = 0.55 + 0.45 * sin(u_time * 1.4 + h * 47.0);
      c += vec3(smoothstep(0.005, 0.0, d2)) * twinkle * (1.0 - fl * 0.22) * (0.5 + intensity * 0.5);
    }
  }
  return c;
}

void main(){
  /* normalized screen coordinates, origin at center */
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;

  float rs = 0.15;  // Schwarzschild event horizon radius

  /* === CAMERA SETUP === */
  // Move camera slightly in response to mouse movement for dynamic 3D angle rotation
  vec3 ro = vec3(u_mouse.x * 2.4, u_mouse.y * 1.8 + 0.48, 3.4);
  vec3 target = vec3(0.0, 0.0, 0.0);
  vec3 ww = normalize(target - ro);
  vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  vec3 vv = cross(uu, ww);
  
  // Ray direction
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.45 * ww);

  /* === RELATIVISTIC GEODESIC RAYMARCHING === */
  vec3 pos = ro;
  vec3 dir = rd;
  float min_r = 1e6;
  
  vec3 accum_col = vec3(0.0);
  float accum_alpha = 0.0;
  bool hit_horizon = false;
  
  for (int i = 0; i < 64; i++) {
    float r2 = dot(pos, pos);
    float r = sqrt(r2);
    min_r = min(min_r, r);
    
    if (r < rs) {
      hit_horizon = true;
      break;
    }
    
    // Bending force (general relativity geodesic step)
    vec3 L = cross(pos, dir);
    float L2 = dot(L, L);
    
    // Adaptive step sizing: smaller steps near gravity well, larger steps far away
    float step_size = min(0.08, max(0.012, r * 0.04));
    
    vec3 gravity = -1.5 * rs * L2 * pos / (r2 * r2 * r);
    dir += gravity * step_size;
    dir = normalize(dir);
    
    // Step forward
    pos += dir * step_size;
    
    // === VOLUMETRIC ACCRETION DISK ===
    // Disk lies on XZ plane (y=0)
    float disk_r = length(pos.xz);
    float disk_in = rs * 2.3;
    float disk_out = rs * 8.0;
    
    if (disk_r >= disk_in && disk_r <= disk_out) {
      // Volumetric thickness grows slightly outwards
      float thickness = 0.02 * (1.0 + (disk_r - disk_in) * 0.25);
      float dist_to_plane = abs(pos.y);
      float height_envelope = exp(-pow(dist_to_plane / thickness, 2.0));
      
      // Radial falloff: peaks near inner edge, falls off outwards
      float r_t = (disk_r - disk_in) / (disk_out - disk_in);
      float radial_envelope = pow(1.0 - r_t, 2.0) * smoothstep(0.0, 0.1, r_t);
      
      float base_density = height_envelope * radial_envelope;
      
      if (base_density > 0.01) {
        float theta = atan(pos.z, pos.x);
        
        // Keplerian rotation: inner part swirls faster
        float rot_speed = 0.65 / pow(disk_r + 0.05, 0.75);
        float angle = theta + u_time * rot_speed;
        
        // Swirling plasma filaments from 2-layer FBM noise
        vec2 noise_uv = vec2(disk_r * 2.2, angle * 1.6);
        float density = base_density * (0.3 + 0.7 * fbm(noise_uv));
        
        // Relativistic Doppler Beaming (gases rotate counter-clockwise around Y axis)
        vec3 v = vec3(-pos.z, 0.0, pos.x) / disk_r;
        float doppler = 1.0 + 1.25 * dot(dir, v);
        doppler = max(0.12, doppler);
        
        // Color temperature grading: white-hot in inner region, neon accent color in outer bands
        float temp = pow(radial_envelope, 1.1) * density;
        vec3 disk_col = mix(u_accent, vec3(1.0, 0.98, 0.93), clamp(temp * 2.0, 0.0, 1.0));
        
        // Volumetric density integration
        float step_alpha = density * step_size * 22.0;
        accum_col += (1.0 - accum_alpha) * disk_col * doppler * step_alpha;
        accum_alpha += (1.0 - accum_alpha) * step_alpha;
        
        if (accum_alpha > 0.98) {
          accum_alpha = 1.0;
          break;
        }
      }
    }
    
    // === VOLUMETRIC POLAR JETS ===
    // Conical shape along the Y axis
    float dist_axis = length(pos.xz);
    float height = abs(pos.y);
    if (height > rs * 0.4) {
      float jet_radius = height * 0.16 + 0.02;
      float jet_envelope = exp(-pow(dist_axis / jet_radius, 2.0)) * exp(-height * 0.45) * smoothstep(rs * 0.4, rs * 1.5, height);
      
      if (jet_envelope > 0.01) {
        // Helical twisting pattern along poles
        float jet_angle = atan(pos.z, pos.x) + height * 4.0 - u_time * 2.8;
        float jet_noise = fbm(vec2(height * 2.5, jet_angle * 1.2));
        float jet_density = jet_envelope * (0.2 + 0.8 * jet_noise);
        
        // Color shifts from neon accent near center to cool electric blue at distance
        vec3 jet_col = mix(u_accent, vec3(0.5, 0.75, 1.0), clamp(height * 0.18, 0.0, 1.0)) * 2.5;
        
        float step_alpha = jet_density * step_size * 10.0;
        accum_col += (1.0 - accum_alpha) * jet_col * step_alpha;
        accum_alpha += (1.0 - accum_alpha) * step_alpha;
        
        if (accum_alpha > 0.98) {
          accum_alpha = 1.0;
          break;
        }
      }
    }
  }

  /* === ENVIRONMENT SHADING & LENSING === */
  if (!hit_horizon) {
    // Project background stars using stereographic projection of final lensed ray direction
    vec2 star_uv = dir.xy / (1.0 + abs(dir.z));
    vec3 bg = sampleStars(star_uv * 1.4);
    
    // Gravitational lens magnification of the background stars near the photon sphere
    float mag = exp(-pow((min_r - rs * 1.35) * 6.0, 2.0));
    bg *= 1.0 + mag * 3.5;
    
    accum_col += (1.0 - accum_alpha) * bg;
  }
  
  // Einstein Photon Ring (drawn cleanly based on min_r for perfect anti-aliasing)
  float photon_ring = exp(-pow((min_r - rs * 1.25) / (rs * 0.04), 2.0));
  accum_col += (1.0 - accum_alpha) * (u_accent * 3.2 + vec3(1.0, 0.97, 0.91) * 2.0) * photon_ring * 0.8;
  
  // Soft outer accretion disk halo glow
  float disk_r_proj = length(uv);
  float halo = exp(-disk_r_proj * 3.5) * 0.14;
  accum_col += u_accent * halo;
  
  // Reinhard tone mapping + gamma correction
  accum_col = accum_col / (1.0 + accum_col);
  accum_col = pow(accum_col, vec3(1.0 / 2.2));
  
  // Edge fade to make the canvas composite beautifully
  float fade = smoothstep(1.3, 0.4, length(uv));
  gl_FragColor = vec4(accum_col * fade, fade);
}
`;

export function BlackHole() {
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
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) { canvas.style.display = "none"; return; }

    // Premultiplied-style additive blending so the alpha fade composites cleanly
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn("[blackhole] shader error:", gl.getShaderInfoLog(sh));
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

    // Fullscreen triangle (covers viewport with 3 vertices)
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
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const acc = window.__accentRGB || [0.913, 0.290, 0.549];
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, elapsed * 0.001);
      gl.uniform3f(u_accent, acc[0], acc[1], acc[2]);
      gl.uniform2f(u_mouse, mouse.x, mouse.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
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
      // Do NOT call WEBGL_lose_context.loseContext() here — in React 18 StrictMode
      // the same canvas element is reused for the dev-mode double-mount, and a
      // lost context cannot be re-acquired on the same canvas. The GC will
      // release the context when the canvas leaves the DOM for real.
    };
  }, []);

  return <canvas ref={ref} className="blackhole-canvas" aria-hidden="true" />;
}
