import React, { useEffect, useRef } from "react";
import { LiquidGlassContext } from "./LiquidGlassContext";

interface BackgroundProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function LiquidGlassBackground({ canvasRef }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, alpha: false });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // 1. Create Shaders
    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texcoord = a_texcoord;
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      uniform vec2 u_resolution;
      uniform vec2 u_textureSize;
      uniform float u_blurRadius;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_edgeDistance;
      uniform float u_rimDistance;
      uniform float u_baseDistance;
      uniform float u_cornerBoost;
      uniform float u_rippleEffect;
      uniform float u_tintOpacity;
      uniform float u_warp;
      uniform float u_time;
      varying vec2 v_texcoord;

      float roundedRectDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 toCorner = abs(pixelCoord - center) - (center - radius);
        float outsideCorner = length(max(toCorner, 0.0));
        float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
        return (outsideCorner + insideCorner - radius);
      }

      void main() {
        vec2 coord = v_texcoord;
        vec2 containerSize = u_resolution;
        vec2 textureSize = u_textureSize;
        vec2 textureCoord = coord;

        // 1. Math for vertical fluted columns (staggered glass ribs)
        float numRibs = 18.0;
        float ribIndex = floor(coord.x * numRibs);
        float ribFract = fract(coord.x * numRibs);

        // Cylindrical lens horizontal refraction normal (-1 to 1)
        float ribNormalX = (ribFract - 0.5) * 2.0;

        // Stepped vertical offset per column, animated to create a wavy column motion
        float vertOffset = sin(ribIndex * 1.7 + u_time * 2.5) * 0.08;

        // Add dynamic horizontal ripple along the rib height (waving effect)
        float ribWave = sin(coord.y * 12.0 - u_time * 3.5) * 0.18;
        ribNormalX += ribWave;

        // Apply column-based displacement
        textureCoord.y += vertOffset;
        textureCoord.x += ribNormalX * 0.075;

        // 2. Base refraction warping from screen center
        vec2 center = vec2(0.5, 0.5);
        vec2 normalDir = coord - center;
        vec2 shapeNormal = length(normalDir) > 0.0 ? normalize(normalDir) : vec2(0.0, 1.0);

        float distFromEdgeShape = -roundedRectDistance(coord, u_resolution, 0.0);
        distFromEdgeShape = max(distFromEdgeShape, 0.0);
        float distFromEdge = distFromEdgeShape / min(u_resolution.x, u_resolution.y);

        float normalizedDistance = distFromEdge * min(u_resolution.x, u_resolution.y);
        float baseIntensity = 1.0 - exp(-normalizedDistance * u_baseDistance);
        float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
        float rimIntensity = exp(-normalizedDistance * u_rimDistance);
        
        float baseComponent = u_warp > 0.5 ? baseIntensity * u_baseIntensity : 0.0;
        float totalIntensity = baseComponent + edgeIntensity * u_edgeIntensity + rimIntensity * u_rimIntensity;
        vec2 baseRefraction = shapeNormal * totalIntensity;

        // Corner boost
        float distFromLeft = coord.x;
        float distFromRight = 1.0 - coord.x;
        float distFromTop = coord.y;
        float distFromBottom = 1.0 - coord.y;
        float cornerProximityX = min(distFromLeft, distFromRight);
        float cornerProximityY = min(distFromTop, distFromBottom);
        float cornerDistance = max(cornerProximityX, cornerProximityY);
        float cornerNormalized = cornerDistance * min(u_resolution.x, u_resolution.y);
        float cornerBoost = exp(-cornerNormalized * 0.3) * u_cornerBoost;
        vec2 cornerRefraction = shapeNormal * cornerBoost;

        // Rippling (animated wave ripples running outward, wider and faster)
        vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
        float ripple = sin(distFromEdge * 7.0 - u_time * 4.5) * u_rippleEffect * (rimIntensity + 0.35);
        vec2 textureRefraction = perpendicular * ripple;

        vec2 totalRefraction = baseRefraction + cornerRefraction + textureRefraction;
        textureCoord += totalRefraction;
        textureCoord = clamp(textureCoord, vec2(0.001), vec2(0.999));

        // 3. Dynamic Edge-Enhanced Blur
        float edgeBlur = u_blurRadius * (1.0 + rimIntensity * 1.8);
        vec4 color = vec4(0.0);
        vec2 texelSize = 1.0 / u_textureSize;
        float sigma = edgeBlur / 2.0;
        vec2 blurStep = texelSize * sigma;
        float totalWeight = 0.0;

        for(int i = -4; i <= 4; i++) {
          for(int j = -4; j <= 4; j++) {
            float distance = length(vec2(float(i), float(j)));
            if(distance > 4.0) continue;
            float weight = exp(-(distance * distance) / (2.0 * sigma * sigma));
            // Anisotropic sampling: compress horizontal blur and stretch vertical blur (rib effect)
            vec2 offset = vec2(float(i) * 0.22, float(j) * 3.2) * blurStep;
            color += texture2D(u_image, textureCoord + offset) * weight;
            totalWeight += weight;
          }
        }
        color /= totalWeight;

        // Tint overlay
        float gradientPosition = coord.y;
        vec3 topTint = vec3(1.0, 1.0, 1.0);
        vec3 bottomTint = vec3(0.06, 0.06, 0.08);
        vec3 gradientTint = mix(topTint, bottomTint, gradientPosition);
        
        // Dynamically lower tint intensity over bright blobs to let them pop
        float dynamicTintOpacity = u_tintOpacity * (1.0 - clamp(color.r * 1.2, 0.0, 0.8));
        vec3 tintedColor = mix(color.rgb, gradientTint, dynamicTintOpacity);

        // Additive bloom glow boost for white-hot parts
        float glowAmount = max(color.r + color.g + color.b - 1.2, 0.0) * 0.38;
        tintedColor += vec3(glowAmount * 1.2, glowAmount * 1.0, glowAmount * 0.85);

        gl_FragColor = vec4(tintedColor, 1.0);
      }
    `;

    function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Geometry buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const texcoordLoc = gl.getAttribLocation(program, "a_texcoord");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const textureSizeLoc = gl.getUniformLocation(program, "u_textureSize");
    const blurRadiusLoc = gl.getUniformLocation(program, "u_blurRadius");
    const edgeIntensityLoc = gl.getUniformLocation(program, "u_edgeIntensity");
    const rimIntensityLoc = gl.getUniformLocation(program, "u_rimIntensity");
    const baseIntensityLoc = gl.getUniformLocation(program, "u_baseIntensity");
    const edgeDistanceLoc = gl.getUniformLocation(program, "u_edgeDistance");
    const rimDistanceLoc = gl.getUniformLocation(program, "u_rimDistance");
    const baseDistanceLoc = gl.getUniformLocation(program, "u_baseDistance");
    const cornerBoostLoc = gl.getUniformLocation(program, "u_cornerBoost");
    const rippleEffectLoc = gl.getUniformLocation(program, "u_rippleEffect");
    const tintOpacityLoc = gl.getUniformLocation(program, "u_tintOpacity");
    const warpLoc = gl.getUniformLocation(program, "u_warp");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    // Create Offscreen canvas to render gradient blobs
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (!offscreenCtx) return;

    const glCtx: WebGLRenderingContext = gl;
    const ctx2d: CanvasRenderingContext2D = offscreenCtx;

    // WebGL Texture
    const texture = glCtx.createTexture();
    glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.LINEAR);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.LINEAR);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);

    // Initial sizes
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas || !container || !glCtx) return;
      const rect = container.getBoundingClientRect();
      const w = Math.ceil(rect.width);
      const h = Math.ceil(rect.height);

      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvas.width = w;
        canvas.height = h;
        
        // Downscale offscreen texture size slightly for high-performance blur sampling
        offscreenCanvas.width = Math.ceil(w / 2);
        offscreenCanvas.height = Math.ceil(h / 2);

        glCtx.viewport(0, 0, w, h);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    // Blob state for animation (Faster drift velocities and pulsing cycles)
    const blobs = [
      { x: 0.15, y: 0.85, vx: 0.0022, vy: 0.0016, baseRadius: 0.42, radius: 0.42, pulseSpeed: 0.048, pulsePhase: 0 },
      { x: 0.85, y: 0.9, vx: -0.0018, vy: -0.0014, baseRadius: 0.35, radius: 0.35, pulseSpeed: 0.042, pulsePhase: 2 },
      { x: 0.5, y: 0.95, vx: 0.0015, vy: -0.0018, baseRadius: 0.38, radius: 0.38, pulseSpeed: 0.038, pulsePhase: 4 },
    ];

    let animationId: number;
    let time = 0;

    function renderLoop() {
      if (!glCtx || !ctx2d) return;
      time += 0.02; // Faster overall WebGL time increment
      resize();

      if (width === 0 || height === 0) {
        animationId = requestAnimationFrame(renderLoop);
        return;
      }

      // 1. Draw animated gradient blobs onto offscreen canvas
      const ow = offscreenCanvas.width;
      const oh = offscreenCanvas.height;
      ctx2d.fillStyle = "#050507"; // Deep dark background
      ctx2d.fillRect(0, 0, ow, oh);

      // Get active theme accent color from root element styles
      const glowRgb = getComputedStyle(document.documentElement)
        .getPropertyValue("--glow-rgb")
        .trim() || "244, 63, 94"; // fallback to brand glow

      blobs.forEach((b, idx) => {
        b.pulsePhase += b.pulseSpeed;
        // Faster and deeper pulsing scale depth (pulsing between 0.75x and 1.25x)
        b.radius = b.baseRadius * (1 + 0.25 * Math.sin(b.pulsePhase));

        // Update positions with organic drift
        b.x += b.vx;
        b.y += b.vy;

        // Keep bounded to lower screen area
        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1;
        if (b.y < 0.55 || b.y > 1.15) b.vy *= -1;

        const px = b.x * ow;
        const py = b.y * oh;
        const rx = b.radius * Math.min(ow, oh);
        // Stretched vertically by 2.4x for a more dramatic light column / flame wave effect
        const ry = rx * 2.4;

        ctx2d.beginPath();
        ctx2d.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);

        const grad = ctx2d.createRadialGradient(px, py, 0, px, py, Math.max(rx, ry));
        const opacity = idx === 0 ? 1.0 : idx === 1 ? 0.96 : 0.88;

        // Multi-stop gradient with intense white core and bright themed color
        grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        grad.addColorStop(0.12, `rgba(255, 255, 255, ${opacity})`);
        grad.addColorStop(0.25, `rgba(255, 235, 195, ${opacity * 0.98})`); // Hot golden highlight
        grad.addColorStop(0.50, `rgba(${glowRgb}, ${opacity * 0.95})`);    // Full saturated theme color
        grad.addColorStop(0.78, `rgba(${glowRgb}, ${opacity * 0.45})`);    // Strong theme outer glow
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx2d.fillStyle = grad;
        ctx2d.fill();
      });

      // 2. Upload offscreen canvas as WebGL texture
      glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
      glCtx.texImage2D(glCtx.TEXTURE_2D, 0, glCtx.RGBA, glCtx.RGBA, glCtx.UNSIGNED_BYTE, offscreenCanvas);

      // 3. Clear and draw full screen quad
      glCtx.clearColor(0.0, 0.0, 0.0, 0.0);
      glCtx.clear(glCtx.COLOR_BUFFER_BIT);

      // Bind attributes and uniforms
      glCtx.enableVertexAttribArray(positionLoc);
      glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer);
      glCtx.vertexAttribPointer(positionLoc, 2, glCtx.FLOAT, false, 0, 0);

      glCtx.enableVertexAttribArray(texcoordLoc);
      glCtx.bindBuffer(glCtx.ARRAY_BUFFER, texcoordBuffer);
      glCtx.vertexAttribPointer(texcoordLoc, 2, glCtx.FLOAT, false, 0, 0);

      glCtx.uniform2f(resolutionLoc, width, height);
      glCtx.uniform2f(textureSizeLoc, ow, oh);
      glCtx.uniform1f(blurRadiusLoc, 12.0); // sharp inside, blurry near edges
      glCtx.uniform1f(edgeIntensityLoc, 0.022);
      glCtx.uniform1f(rimIntensityLoc, 0.08);
      glCtx.uniform1f(baseIntensityLoc, 0.03);
      glCtx.uniform1f(edgeDistanceLoc, 0.25);
      glCtx.uniform1f(rimDistanceLoc, 0.72);
      glCtx.uniform1f(baseDistanceLoc, 0.2);
      glCtx.uniform1f(cornerBoostLoc, 0.02);
      glCtx.uniform1f(rippleEffectLoc, 0.24); // lower frequency ripple scale
      glCtx.uniform1f(tintOpacityLoc, 0.24);
      glCtx.uniform1f(warpLoc, 1.0);
      glCtx.uniform1f(timeLoc, time);

      glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      if (glCtx) {
        glCtx.deleteBuffer(positionBuffer);
        glCtx.deleteBuffer(texcoordBuffer);
        glCtx.deleteTexture(texture);
        glCtx.deleteProgram(program);
      }
    };
  }, [canvasRef]);

  return (
    <div ref={containerRef} className="hero-glass-bg hero-glass-bg--webgl">
      <canvas ref={canvasRef} className="webgl-glass-canvas" />
      <div className="hero-glass-overlay" />
    </div>
  );
}
