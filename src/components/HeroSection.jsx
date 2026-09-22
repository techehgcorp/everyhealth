"use client";
import { useEffect, useRef, useState } from "react";
import { enrollmentPeriods, getStatus } from "../data/enrollmentPeriods";
import AcaZipCapture from "./AcaZipCapture";
import { brand } from "@/lib/brand";

const CIRC = 2 * Math.PI * 49; // circumference for r=49 in viewBox 100x100

export default function HeroSection() {
  const r1 = useRef(null);
  const r2 = useRef(null);
  const r3 = useRef(null);
  const arc1 = useRef(null);
  const arc2 = useRef(null);
  const arc3 = useRef(null);
  const textRef    = useRef(null);
  const sectionRef = useRef(null);

  // Status resolves on the client so it can't freeze at build time
  const [now, setNow] = useState(null);
  useEffect(() => { setNow(new Date()); }, []);

  // Mouse parallax for rings + glint arc rotation
  useEffect(() => {
    let rafId;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let a1 = 0, a2 = 0, a3 = 0;

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const lerpAngle = (cur, target) => {
      let diff = target - cur;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      return cur + diff * 0.06;
    };

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;

      if (r1.current) r1.current.style.transform = `translate(calc(-50% + ${cx * 28}px), calc(-50% + ${cy * 28}px))`;
      if (r2.current) r2.current.style.transform = `translate(calc(-50% + ${cx * -18}px), calc(-50% + ${cy * -18}px))`;
      if (r3.current) r3.current.style.transform = `translate(calc(-50% + ${cx * 44}px), calc(-50% + ${cy * 44}px))`;

      // Mouse in pixels
      const mx = (tx / 2 + 0.5) * window.innerWidth;
      const my = (ty / 2 + 0.5) * window.innerHeight;

      // Angle from each ring center to mouse cursor
      const ang = (baseL, baseT, ox, oy) =>
        Math.atan2(my - (window.innerHeight * baseT + oy), mx - (window.innerWidth * baseL + ox)) * 180 / Math.PI;

      a1 = lerpAngle(a1, ang(0.62, 0.52, cx * 28, cy * 28));
      a2 = lerpAngle(a2, ang(0.60, 0.50, cx * -18, cy * -18));
      a3 = lerpAngle(a3, ang(0.64, 0.48, cx * 44, cy * 44));

      if (arc1.current) arc1.current.setAttribute("transform", `rotate(${a1.toFixed(2)}, 50, 50)`);
      if (arc2.current) arc2.current.setAttribute("transform", `rotate(${a2.toFixed(2)}, 50, 50)`);
      if (arc3.current) arc3.current.setAttribute("transform", `rotate(${a3.toFixed(2)}, 50, 50)`);

      rafId = requestAnimationFrame(tick);
    };

    // Pointer parallax is a fine-pointer affordance — skip the rAF loop
    // entirely on touch devices and for reduced-motion visitors.
    const fine   = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || motion.matches) return;

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  // Scroll parallax + zoom for headline block only.
  // Disabled on small screens (text would exit the viewport) and when the
  // visitor has asked for reduced motion.
  useEffect(() => {
    let rafId;
    let targetX = 0, currentX = 0;
    let targetS = 1, currentS = 1;

    const smallQuery  = window.matchMedia("(max-width: 991.98px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onScroll = () => {
      const s = sectionRef.current;
      if (!s) return;
      if (smallQuery.matches || motionQuery.matches) {
        targetX = 0;
        targetS = 1;
        return;
      }
      const progress = Math.min(1, Math.max(0, window.scrollY / s.offsetHeight));
      targetX = progress * 180;
      targetS = 1 + progress * 0.35;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentS += (targetS - currentS) * 0.07;
      if (textRef.current)
        textRef.current.style.transform = `translateX(${currentX.toFixed(2)}px) scale(${currentS.toFixed(4)})`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Glint arc = 22% of circumference
  const dash = `${(CIRC * 0.22).toFixed(1)} ${(CIRC * 0.78).toFixed(1)}`;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero section hero-video-bg"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="hero-bg-animated"
        poster="/assets/img/hero/everyhealth_hero_bg.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/assets/img/hero/everyhealth.mp4" type="video/mp4" />
      </video>

      {/* Readability scrim — brand navy, weighted left over the copy column.
          Styles live in globals.css so the gradient can respond to breakpoints. */}
      <div className="hero-scrim" aria-hidden="true" />

      {/* ── Hexagon 1 — large (68vmin) ── */}
      <div ref={r1} aria-hidden="true" style={{
        position: "absolute", top: "52%", left: "62%",
        width: "68vmin", height: "68vmin",
        zIndex: 2, pointerEvents: "none", willChange: "transform",
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <filter id="heroGlow1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Static ambient hexagon outline */}
          <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
            stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinejoin="round" />
          <g ref={arc1}>
            {/* soft glow reflection arc */}
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
              stroke="rgba(94,200,240,0.45)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="70 206" filter="url(#heroGlow1)" />
            {/* crisp bright core */}
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
              stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="70 206" />
          </g>
        </svg>
      </div>

      {/* ── Hexagon 2 — mid (46vmin), opposite parallax ── */}
      <div ref={r2} aria-hidden="true" style={{
        position: "absolute", top: "50%", left: "60%",
        width: "46vmin", height: "46vmin",
        zIndex: 2, pointerEvents: "none", willChange: "transform",
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <filter id="heroGlow2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
            stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" strokeLinejoin="round" />
          <g ref={arc2}>
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
              stroke="rgba(117,201,0,0.40)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="60 216" filter="url(#heroGlow2)" />
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
              stroke="rgba(255,255,255,0.80)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="60 216" />
          </g>
        </svg>
      </div>

      {/* ── Hexagon 3 — small (22vmin), fastest parallax ── */}
      <div ref={r3} aria-hidden="true" style={{
        position: "absolute", top: "48%", left: "64%",
        width: "22vmin", height: "22vmin",
        zIndex: 2, pointerEvents: "none", willChange: "transform",
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <filter id="heroGlow3" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
            stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeLinejoin="round" />
          <g ref={arc3}>
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
              stroke="rgba(255,255,255,0.30)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="45 231" filter="url(#heroGlow3)" />
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none"
              stroke="rgba(255,255,255,0.75)" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="45 231" />
          </g>
        </svg>
      </div>

      {/* Text content */}
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="row align-items-center hero-row">
          <div className="col-lg-6">

            {/* Parallax block — headline, subhead, CTAs */}
            <div ref={textRef} className="hero-content" style={{ willChange: "transform" }}>
              <p className="hero-eyebrow" data-aos="fade-right" data-aos-delay={250}>
                We&apos;re {brand.name}
              </p>

              <h1 data-aos="fade-right" data-aos-delay={300} style={{ color: "#fff" }}>
                Coverage Guidance for <span className="highlight" style={{ background: "linear-gradient(135deg, #75C900 0%, #5EC8F0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Every Stage of Health</span>.
              </h1>

              <p className="hero-description" data-aos="fade-right" data-aos-delay={400}>
                Health coverage can feel confusing, especially when life changes quickly.
                EveryHealth helps you compare ACA, Medicare, life, dental, vision, and
                critical illness options with licensed support and clear next steps.
              </p>

              <ul className="hero-trust" data-aos="fade-right" data-aos-delay={500}>
                <li><i className="bi bi-check-lg" aria-hidden="true" /> No Cost for Our Guidance</li>
                <li><i className="bi bi-check-lg" aria-hidden="true" /> Licensed Insurance Support</li>
                <li><i className="bi bi-check-lg" aria-hidden="true" /> Health, Life, Dental and Vision</li>
              </ul>

              <div className="hero-actions" data-aos="fade-right" data-aos-delay={600}>
                <a href="#quote" className="btn btn-primary" data-quote-modal-trigger>
                  Get a Free Quote
                </a>
                <AcaZipCapture variant="hero" />
              </div>
            </div>

            {/* Static block — stays put while the headline parallaxes away */}
            <div
              className="hero-enrollment"
              data-aos="fade-up"
              data-aos-delay={700}
              aria-label="Current enrollment periods"
            >
              <p className="hero-enrollment__title">Enrollment Periods</p>
              <ul className="hero-enrollment__list">
                {enrollmentPeriods.map((p) => {
                  const status = now ? getStatus(p, now) : "idle";
                  return (
                    <li key={p.id} className={`hero-enrollment__item is-${status}`}>
                      <span className="hero-enrollment__dot" aria-hidden="true" />
                      <span className="hero-enrollment__text">
                        <strong>{p.abbr}</strong>
                        <span className="hero-enrollment__note">{p.note}</span>
                      </span>
                      <span className="hero-enrollment__date">{p.display}</span>
                      {status !== "idle" && (
                        <span className="visually-hidden">
                          {status === "open" ? "Open now"
                            : status === "upcoming" ? "Not yet open"
                            : "Closed"}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
