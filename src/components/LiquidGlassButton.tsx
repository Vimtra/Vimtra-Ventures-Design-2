import React, { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { LiquidGlassContext } from "./LiquidGlassContext";

interface Props {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export function LiquidGlassButton({ to, className = "", children }: Props) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentCanvasRef = useContext(LiquidGlassContext);

  useEffect(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    const parentCanvas = parentCanvasRef?.current;
    if (!button || !canvas || !parentCanvas) return;

    const buttonEl: HTMLAnchorElement = button;
    const canvasEl: HTMLCanvasElement = canvas;
    const parentCanvasEl: HTMLCanvasElement = parentCanvas;

    const gl = canvasEl.getContext("webgl", { preserveDrawingBuffer: false, alpha: true });
    if (!gl) {
      console.warn("WebGL not supported for button");
      return;
    }

    const glCtx: WebGLRenderingContext = gl;

    // 1. Shaders
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
      uniform vec2 u_resolution; // Button dimensions
      uniform vec2 u_containerSize; // Parent background size
      uniform vec2 u_buttonPosition; // Center of button in viewport
      uniform vec2 u_containerPosition; // Center of parent in viewport
      uniform float u_blurRadius;
      uniform float u_borderRadius;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_edgeDistance;
      uniform float u_rimDistance;
      uniform float u_baseDistance;
      uniform float u_cornerBoost;
      uniform float u_rippleEffect;
      uniform float u_tintOpacity;
      varying vec2 v_texcoord;

      float roundedRectDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 toCorner = abs(pixelCoord - center) - (center - radius);
        float outsideCorner = length(max(toCorner, 0.0));
        float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
        return (outsideCorner + insideCorner - radius);
      }

      float pillDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 capsuleStart = vec2(radius, center.y);
        vec2 capsuleEnd = vec2(size.x - radius, center.y);
        vec2 capsuleAxis = capsuleEnd - capsuleStart;
        float capsuleLength = length(capsuleAxis);
        if (capsuleLength > 0.0) {
          vec2 toPoint = pixelCoord - capsuleStart;
          float t = clamp(dot(toPoint, capsuleAxis) / dot(capsuleAxis, capsuleAxis), 0.0, 1.0);
          vec2 closestPointOnAxis = capsuleStart + t * capsuleAxis;
          return length(pixelCoord - closestPointOnAxis) - radius;
        } else {
          return length(pixelCoord - center) - radius;
        }
      }

      bool isPill(vec2 size, float radius) {
        return radius >= size.y * 0.48;
      }

      void main() {
        vec2 coord = v_texcoord;
        vec2 buttonSize = u_resolution;
        vec2 containerSize = u_containerSize;

        // Map button viewport space to parent container space
        vec2 containerTopLeft = u_containerPosition - containerSize * 0.5;
        vec2 buttonTopLeft = u_buttonPosition - buttonSize * 0.5;
        vec2 buttonRelativePos = buttonTopLeft - containerTopLeft;
        
        vec2 buttonPixel = coord * buttonSize;
        vec2 containerPixel = buttonRelativePos + buttonPixel;
        vec2 baseTextureCoord = containerPixel / containerSize;

        // Button refraction calculations
        float distFromEdgeShape;
        vec2 shapeNormal;
        vec2 center = vec2(0.5, 0.5);

        if (isPill(buttonSize, u_borderRadius)) {
          distFromEdgeShape = -pillDistance(coord, buttonSize, u_borderRadius);
          vec2 pixelCoord = coord * buttonSize;
          vec2 capsuleStart = vec2(u_borderRadius, center.y * buttonSize.y);
          vec2 capsuleEnd = vec2(buttonSize.x - u_borderRadius, center.y * buttonSize.y);
          vec2 capsuleAxis = capsuleEnd - capsuleStart;
          float capsuleLength = length(capsuleAxis);
          if (capsuleLength > 0.0) {
            vec2 toPoint = pixelCoord - capsuleStart;
            float t = clamp(dot(toPoint, capsuleAxis) / dot(capsuleAxis, capsuleAxis), 0.0, 1.0);
            vec2 closestPointOnAxis = capsuleStart + t * capsuleAxis;
            vec2 normalDir = pixelCoord - closestPointOnAxis;
            shapeNormal = length(normalDir) > 0.0 ? normalize(normalDir) : vec2(0.0, 1.0);
          } else {
            shapeNormal = normalize(coord - center);
          }
        } else {
          distFromEdgeShape = -roundedRectDistance(coord, buttonSize, u_borderRadius);
          vec2 normalDir = coord - center;
          shapeNormal = length(normalDir) > 0.0 ? normalize(normalDir) : vec2(0.0, 1.0);
        }

        distFromEdgeShape = max(distFromEdgeShape, 0.0);
        float distFromEdge = distFromEdgeShape / min(buttonSize.x, buttonSize.y);

        float normalizedDistance = distFromEdge * min(buttonSize.x, buttonSize.y);
        float baseIntensity = 1.0 - exp(-normalizedDistance * u_baseDistance);
        float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
        float rimIntensity = exp(-normalizedDistance * u_rimDistance);
        
        float totalIntensity = edgeIntensity * u_edgeIntensity + rimIntensity * u_rimIntensity;
        vec2 baseRefraction = shapeNormal * totalIntensity;

        vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
        float ripple = sin(distFromEdge * 30.0) * u_rippleEffect * rimIntensity;
        vec2 textureRefraction = perpendicular * ripple;

        vec2 totalRefraction = baseRefraction + textureRefraction;
        vec2 textureCoord = baseTextureCoord + totalRefraction;
        textureCoord = clamp(textureCoord, vec2(0.001), vec2(0.999));

        // Blur parent background canvas texture
        vec4 color = vec4(0.0);
        vec2 texelSize = 1.0 / containerSize;
        float sigma = u_blurRadius / 3.0; // Sharp/subtle double blur
        vec2 blurStep = texelSize * sigma;
        float totalWeight = 0.0;

        for(int i = -3; i <= 3; i++) {
          for(int j = -3; j <= 3; j++) {
            float distance = length(vec2(float(i), float(j)));
            if(distance > 3.0) continue;
            float weight = exp(-(distance * distance) / (2.0 * sigma * sigma));
            vec2 offset = vec2(float(i), float(j)) * blurStep;
            color += texture2D(u_image, textureCoord + offset) * weight;
            totalWeight += weight;
          }
        }
        color /= totalWeight;

        // Button gradient highlights & border shading
        float gradientPosition = coord.y;
        vec3 buttonTopTint = vec3(1.15, 1.15, 1.15); // Light rim highlight
        vec3 buttonBottomTint = vec3(0.90, 0.90, 0.90);
        vec3 buttonGradient = mix(buttonTopTint, buttonBottomTint, gradientPosition);
        vec3 finalColor = color.rgb * buttonGradient;

        // Apply dark rim border glow
        float edgeHighlight = smoothstep(0.0, 0.08, distFromEdge);
        finalColor = mix(vec3(1.0, 1.0, 1.0) * 0.12, finalColor, edgeHighlight);

        // Mask to pill/capsule shape boundaries
        float maskDistance;
        if (isPill(buttonSize, u_borderRadius)) {
          maskDistance = pillDistance(coord, buttonSize, u_borderRadius);
        } else {
          maskDistance = roundedRectDistance(coord, buttonSize, u_borderRadius);
        }
        float mask = 1.0 - smoothstep(-1.0, 1.0, maskDistance);

        gl_FragColor = vec4(finalColor, mask);
      }
    `;

    function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Button shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(glCtx, glCtx.VERTEX_SHADER, vsSource);
    const fs = compileShader(glCtx, glCtx.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = glCtx.createProgram();
    if (!program) return;
    glCtx.attachShader(program, vs);
    glCtx.attachShader(program, fs);
    glCtx.linkProgram(program);
    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
      console.error("Button program link error:", glCtx.getProgramInfoLog(program));
      return;
    }
    glCtx.useProgram(program);

    // Buffers
    const positionBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      glCtx.STATIC_DRAW
    );

    const texcoordBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, texcoordBuffer);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
      glCtx.STATIC_DRAW
    );

    const positionLoc = glCtx.getAttribLocation(program, "a_position");
    const texcoordLoc = glCtx.getAttribLocation(program, "a_texcoord");
    const resolutionLoc = glCtx.getUniformLocation(program, "u_resolution");
    const containerSizeLoc = glCtx.getUniformLocation(program, "u_containerSize");
    const buttonPositionLoc = glCtx.getUniformLocation(program, "u_buttonPosition");
    const containerPositionLoc = glCtx.getUniformLocation(program, "u_containerPosition");
    const blurRadiusLoc = glCtx.getUniformLocation(program, "u_blurRadius");
    const borderRadiusLoc = glCtx.getUniformLocation(program, "u_borderRadius");
    const edgeIntensityLoc = glCtx.getUniformLocation(program, "u_edgeIntensity");
    const rimIntensityLoc = glCtx.getUniformLocation(program, "u_rimIntensity");
    const baseIntensityLoc = glCtx.getUniformLocation(program, "u_baseIntensity");
    const edgeDistanceLoc = glCtx.getUniformLocation(program, "u_edgeDistance");
    const rimDistanceLoc = glCtx.getUniformLocation(program, "u_rimDistance");
    const baseDistanceLoc = glCtx.getUniformLocation(program, "u_baseDistance");
    const cornerBoostLoc = glCtx.getUniformLocation(program, "u_cornerBoost");
    const rippleEffectLoc = glCtx.getUniformLocation(program, "u_rippleEffect");
    const tintOpacityLoc = glCtx.getUniformLocation(program, "u_tintOpacity");
    const imageLoc = glCtx.getUniformLocation(program, "u_image");

    // Texture referencing the parent background canvas
    const texture = glCtx.createTexture();
    glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
    glCtx.texImage2D(
      glCtx.TEXTURE_2D,
      0,
      glCtx.RGBA,
      parentCanvasEl.width,
      parentCanvasEl.height,
      0,
      glCtx.RGBA,
      glCtx.UNSIGNED_BYTE,
      null
    );
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.LINEAR);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.LINEAR);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE);
    glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);

    let width = 0;
    let height = 0;
    let borderRadius = 0;

    function resize() {
      if (!canvasEl || !buttonEl || !glCtx) return;
      const rect = buttonEl.getBoundingClientRect();
      const w = Math.ceil(rect.width);
      const h = Math.ceil(rect.height);

      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvasEl.width = w;
        canvasEl.height = h;
        borderRadius = h / 2; // Perfect Pill/Capsule shape

        glCtx.viewport(0, 0, w, h);
      }
    }
    resize();

    let animationId: number;

    function renderLoop() {
      if (!glCtx || !parentCanvasEl) return;
      resize();

      if (width === 0 || height === 0) {
        animationId = requestAnimationFrame(renderLoop);
        return;
      }

      // Bind texture to the live parent canvas frame
      glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
      glCtx.texImage2D(glCtx.TEXTURE_2D, 0, glCtx.RGBA, glCtx.RGBA, glCtx.UNSIGNED_BYTE, parentCanvasEl);

      glCtx.clearColor(0, 0, 0, 0);
      glCtx.clear(glCtx.COLOR_BUFFER_BIT);

      glCtx.enableVertexAttribArray(positionLoc);
      glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer);
      glCtx.vertexAttribPointer(positionLoc, 2, glCtx.FLOAT, false, 0, 0);

      glCtx.enableVertexAttribArray(texcoordLoc);
      glCtx.bindBuffer(glCtx.ARRAY_BUFFER, texcoordBuffer);
      glCtx.vertexAttribPointer(texcoordLoc, 2, glCtx.FLOAT, false, 0, 0);

      const buttonRect = buttonEl.getBoundingClientRect();
      const parentRect = parentCanvasEl.getBoundingClientRect();

      // Compute centers relative to viewport top-left
      const buttonCenterX = buttonRect.left + buttonRect.width * 0.5;
      const buttonCenterY = buttonRect.top + buttonRect.height * 0.5;
      const parentCenterX = parentRect.left + parentRect.width * 0.5;
      const parentCenterY = parentRect.top + parentRect.height * 0.5;

      glCtx.uniform2f(resolutionLoc, width, height);
      glCtx.uniform2f(containerSizeLoc, parentRect.width, parentRect.height);
      glCtx.uniform2f(buttonPositionLoc, buttonCenterX, buttonCenterY);
      glCtx.uniform2f(containerPositionLoc, parentCenterX, parentCenterY);

      glCtx.uniform1f(blurRadiusLoc, 4.0); // sharp double-blur refraction
      glCtx.uniform1f(borderRadiusLoc, borderRadius);
      glCtx.uniform1f(edgeIntensityLoc, 0.035);
      glCtx.uniform1f(rimIntensityLoc, 0.08);
      glCtx.uniform1f(baseIntensityLoc, 0.02);
      glCtx.uniform1f(edgeDistanceLoc, 0.15);
      glCtx.uniform1f(rimDistanceLoc, 0.8);
      glCtx.uniform1f(baseDistanceLoc, 0.1);
      glCtx.uniform1f(cornerBoostLoc, 0.02);
      glCtx.uniform1f(rippleEffectLoc, 0.12);
      glCtx.uniform1f(tintOpacityLoc, 0.1);

      glCtx.activeTexture(glCtx.TEXTURE0);
      glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
      glCtx.uniform1i(imageLoc, 0);

      glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      if (glCtx) {
        glCtx.deleteBuffer(positionBuffer);
        glCtx.deleteBuffer(texcoordBuffer);
        glCtx.deleteTexture(texture);
        glCtx.deleteProgram(program);
      }
    };
  }, [parentCanvasRef]);

  return (
    <Link ref={buttonRef} to={to} className={`${className} glass-button-webgl`}>
      <canvas ref={canvasRef} className="webgl-button-canvas" />
      <span className="glass-button-content">{children}</span>
    </Link>
  );
}
