/* Starfield + subtle sacred geometry pulse */
(function () {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, stars, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawn();
  }

  function spawn() {
    const count = Math.min(180, Math.floor((w * h) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      s: Math.random() * 0.015 + 0.003,
      hue: Math.random() > 0.85 ? (Math.random() > 0.5 ? 170 : 45) : 0,
    }));
  }

  let t = 0;
  function draw() {
    t += 1;
    ctx.clearRect(0, 0, w, h);

    // faint sacred-geometry hex rings
    const cx = w * 0.5;
    const cy = h * 0.42;
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.008);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.0004);
    for (let ring = 1; ring <= 3; ring++) {
      const R = 80 + ring * 70;
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(ang) * R;
        const y = Math.sin(ang) * R;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(0, 229, 192, ${0.04 + pulse * 0.03})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    // flower-of-life hint: overlapping circles
    ctx.globalAlpha = 0.035 + pulse * 0.02;
    ctx.strokeStyle = "#ffd700";
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(ang) * 55, Math.sin(ang) * 55, 55, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    for (const s of stars) {
      s.a += s.s;
      if (s.a > 1 || s.a < 0) s.s *= -1;
      const alpha = 0.25 + s.a * 0.75;
      if (s.hue === 170) {
        ctx.fillStyle = `rgba(0, 229, 192, ${alpha})`;
      } else if (s.hue === 45) {
        ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(230, 230, 255, ${alpha})`;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
