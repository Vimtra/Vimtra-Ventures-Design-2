// @ts-nocheck

import { useEffect } from 'react';

const useCanvasCursor = () => {
  function n(e) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      return (
        (this.phase += this.frequency),
        (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    value: function () {
      return e;
    },
  };

  function Line(e) {
    this.init(e || {});
  }

  Line.prototype = {
    init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (var t, n = 0; n < E.size; n++) {
        t = new Node();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      var e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n, i = 0, a = this.nodes.length; i < a; i++)
        ((t = this.nodes[i]),
          0 < i &&
            ((n = this.nodes[i - 1]),
            (t.vx += (n.x - t.x) * e),
            (t.vy += (n.y - t.y) * e),
            (t.vx += n.vx * E.dampening),
            (t.vy += n.vy * E.dampening)),
          (t.vx *= this.friction),
          (t.vy *= this.friction),
          (t.x += t.vx),
          (t.y += t.vy),
          (e *= E.tension));
    },
    draw: function () {
      var e,
        t,
        n = this.nodes[0].x,
        i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    },
  };

  function o() {
    lines = [];
    for (var e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
  }

  function c(e) {
    lastMoveTime = Date.now();
    if (e.touches && e.touches.length > 0) {
      pos.x = e.touches[0].clientX;
      pos.y = e.touches[0].clientY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
  }

  function l(e) {
    lastMoveTime = Date.now();
    if (e.touches && e.touches.length === 1) {
      pos.x = e.touches[0].clientX;
      pos.y = e.touches[0].clientY;
    }
  }

  function onMousemove(e) {
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('touchstart', onMousemove);
    document.addEventListener('mousemove', c, { passive: true });
    document.addEventListener('touchmove', c, { passive: true });
    document.addEventListener('touchstart', l, { passive: true });
    c(e);
    o();
    render();
  }

  function render() {
    if (ctx && ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Slowly disappear/decay trail opacity when stationary
      const isIdle = Date.now() - lastMoveTime > 300;
      const targetAlpha = isIdle ? 0 : 1;
      alphaEase += (targetAlpha - alphaEase) * 0.08;

      if (alphaEase > 0.01) {
        ctx.globalCompositeOperation = 'lighter';
        
        // Dynamically get the active theme glow color --glow-rgb
        const glowRgb = getComputedStyle(document.documentElement).getPropertyValue("--glow-rgb").trim() || "226, 32, 32";
        ctx.strokeStyle = `rgba(${glowRgb}, ${alphaEase * 0.16})`;
        ctx.lineWidth = 1;

        for (var e, t = 0; t < E.trails; t++) {
          (e = lines[t]).update();
          e.draw();
        }
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    if (ctx && ctx.canvas) {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
  }

  var ctx,
    f,
    e = 0,
    pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    lines = [],
    lastMoveTime = Date.now(),
    alphaEase = 0,
    E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

  function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  const renderCanvas = function () {
    // Disable on touch devices / devices without hover pointer
    const supportsHover = window.matchMedia("(any-hover: hover)").matches;
    if (!supportsHover) return;

    const el = document.getElementById('canvas');
    if (!el) return;
    ctx = el.getContext('2d');
    if (!ctx) return;

    ctx.running = true;
    ctx.frame = 1;
    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    const onFocus = () => {
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
    };

    const onBlur = () => {
      if (ctx) {
        ctx.running = false;
      }
    };

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    resizeCanvas();

    ctx.cleanup = () => {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.removeEventListener('mousemove', c);
      document.removeEventListener('touchmove', c);
      document.removeEventListener('touchstart', l);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  };

  useEffect(() => {
    renderCanvas();

    return () => {
      if (ctx) {
        ctx.running = false;
        if (ctx.cleanup) ctx.cleanup();
      }
    };
  }, []);
};

export default useCanvasCursor;

export function CanvasCursor() {
  useCanvasCursor();
  return (
    <canvas
      id="canvas"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

