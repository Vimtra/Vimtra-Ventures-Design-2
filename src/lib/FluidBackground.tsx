import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform vec3 u_accent;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<6;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*u_res.xy)/u_res.y;
  float t=u_time*0.05;
  vec2 q=vec2(fbm(p*1.4+t),fbm(p*1.4+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p*1.4+4.*q+vec2(1.7,9.2)+t*1.1),fbm(p*1.4+4.*q+vec2(8.3,2.8)-t));
  float f=fbm(p*1.5+4.*r);
  float md=length(p-u_mouse);
  float mg=smoothstep(0.7,0.0,md)*0.22;
  float intensity=smoothstep(0.28,1.15,f+r.x*0.28)+mg;
  vec3 bg=vec3(0.022,0.022,0.03);
  vec3 mid=vec3(0.055,0.055,0.07);
  vec3 col=mix(bg,mid,smoothstep(0.2,0.7,f));
  col=mix(col,u_accent,pow(clamp(intensity,0.,1.),2.4)*0.62);
  col*=1.0-0.55*dot(p,p);
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.016;
  col*=0.92;
  gl_FragColor=vec4(col,1.0);
}`;

interface Props { className?: string }

export function FluidBackground({ className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { canvas.style.display = "none"; return; }
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) { canvas.style.display = "none"; return; }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh); return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = "none"; return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_time = gl.getUniformLocation(prog, "u_time");
    const u_mouse = gl.getUniformLocation(prog, "u_mouse");
    const u_accent = gl.getUniformLocation(prog, "u_accent");

    const mouse = { x: 0, y: 0.1, tx: 0, ty: 0.1 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left - r.width / 2) / r.height;
      mouse.ty = -(e.clientY - r.top - r.height / 2) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    let raf = 0, start = performance.now(), elapsed = 0, running = true;
    const onVis = () => { running = !document.hidden; if (running) { start = performance.now() - elapsed; loop(); } };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      elapsed = performance.now() - start;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const acc = window.__accentRGB || [0.886, 0.125, 0.125];
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, elapsed * 0.001);
      gl.uniform2f(u_mouse, mouse.x, mouse.y);
      gl.uniform3f(u_accent, acc[0], acc[1], acc[2]);
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
      const ext = gl.getExtension("WEBGL_lose_context"); if (ext) ext.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={className || "fluid-canvas"} aria-hidden="true" />;
}
