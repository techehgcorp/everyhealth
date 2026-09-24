"use client";
import { useEffect, useRef, useState } from "react";
import { enrollmentPeriods, getStatus } from "../data/enrollmentPeriods";
import AcaZipCapture from "./AcaZipCapture";
import { brand } from "@/lib/brand";

// Scene geometry, in the SVG's 1440×728 viewBox — this is the camera's
// pulled-back framing. The track is a handlebar-shaped glass channel: each
// arm enters flat from a side edge, dips through an S-curve and joins the
// flat run along the bottom. It is symmetric around x=720, so half its
// length is the exact centre of the flat run — where the two spheres meet.
const TRACK =
  "M -220 170 L 110 170 C 300 170, 330 640, 520 640 L 920 640 " +
  "C 1110 640, 1140 170, 1330 170 L 1660 170";
const R = 56;               // sphere radius
const ART = R / 78;         // sphere artwork is drawn at r=78
const REST_Y = 640;         // y of the flat run

// Static fallback positions (no JS / reduced motion): touching at centre.
const REST_A = 720 - R - 1;
const REST_B = 720 + R + 1;

// Camera: the whole scene (wall, light, track, spheres) is scaled as one
// layer around the bottom of the spheres at rest — see the transform-origin
// on .hero-clinic__scene. Pushing in to ZOOM_TO sends the arms out past the
// top corners, like the reference.
const ZOOM_TO = 1.6;
const INTRO_MS = 3200;
const ROLL_DELAY = 200;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function HeroSection() {
  const rigRef = useRef(null);
  const trackRef = useRef(null);
  const sphereA = useRef(null);
  const sphereB = useRef(null);
  const spinA = useRef(null);
  const spinB = useRef(null);
  const videoRef = useRef(null);

  // Status resolves on the client so it can't freeze at build time
  const [now, setNow] = useState(null);
  useEffect(() => { setNow(new Date()); }, []);

  // Intro: the camera pushes in while the spheres roll down the arms and
  // meet in the middle with a small knock; afterwards they drift gently
  // with the pointer. Positions come from the real track path, so they
  // stay glued to the channel at any viewport size.
  useEffect(() => {
    const rig = rigRef.current;
    const track = trackRef.current;
    if (!rig || !track) return;
    const svg = track.ownerSVGElement;

    const L = track.getTotalLength();
    const mid = L / 2;
    const restA = mid - R - 1;
    const restB = mid + R + 1;

    const place = (g, spin, s) => {
      const p = track.getPointAtLength(s);
      g.setAttribute("transform", `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
      spin.setAttribute("transform", `rotate(${((s / R) * 180 / Math.PI).toFixed(2)})`);
    };
    const render = (sA, sB) => {
      if (sphereA.current && spinA.current) place(sphereA.current, spinA.current, sA);
      if (sphereB.current && spinB.current) place(sphereB.current, spinB.current, sB);
    };
    const show = () => rig.classList.add("is-ready");

    const scene = svg.closest(".hero-clinic__scene");
    const setZoom = (z) => { scene.style.transform = `scale(${z.toFixed(4)})`; };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    if (motion.matches) {
      videoRef.current?.pause();
      setZoom(ZOOM_TO);
      render(restA, restB);
      show();
      return;
    }

    // Start each sphere at the first point on its arm that is fully on
    // screen (below the fixed header), with the camera pulled back — so
    // the spheres are visible for the whole roll on any screen size.
    const findStart = () => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return 0;
      const box = svg.closest("section").getBoundingClientRect();
      const header = document.getElementById("header");
      const top = Math.max(box.top, header ? header.getBoundingClientRect().bottom : 0);
      const rad = R * ctm.a + 6;

      for (let s = 0; s < mid - 2 * R; s += 6) {
        const p = track.getPointAtLength(s);
        const sx = ctm.a * p.x + ctm.e;
        const sy = ctm.d * p.y + ctm.f;
        if (sy - rad >= top && sx - rad >= box.left) return s;
      }
      return mid - 4 * R;
    };

    setZoom(1);
    const startA = findStart();
    const startB = L - startA;
    render(startA, startB);
    show();

    // Rasterise the scene as its own layer only while it animates, so it
    // re-renders crisp at the final zoom.
    scene.style.willChange = "transform";

    let rafId = 0;
    let visible = true;
    const t0 = performance.now();
    let tx = 0, cx = 0;
    let settled = false;

    const onMove = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; };

    const tick = (t) => {
      const el = t - t0;

      // Camera
      if (el < INTRO_MS) {
        setZoom(1 + (ZOOM_TO - 1) * easeInOutCubic(el / INTRO_MS));
      } else if (!settled) {
        setZoom(ZOOM_TO);
        scene.style.willChange = "";
        settled = true;
      }

      // Spheres
      const rollMs = INTRO_MS - ROLL_DELAY;
      const rel = el - ROLL_DELAY;
      let sA, sB;
      if (rel < rollMs) {
        const k = easeInOutCubic(Math.max(0, rel) / rollMs);
        sA = startA + (restA - startA) * k;
        sB = startB + (restB - startB) * k;
      } else {
        // Contact knock: push apart, settle back. Then follow the pointer
        // along the flat run, the pair staying in contact.
        const tau = rel - rollMs;
        const knock = 12 * Math.sin((tau * Math.PI) / 220) * Math.exp(-tau / 260);
        cx += (tx - cx) * 0.04;
        const drift = cx * 60;
        sA = restA - knock + drift;
        sB = restB + knock + drift;

        // Touch devices have nothing to follow once the knock has settled.
        if (!fine.matches && tau > 1600) { render(restA, restB); rafId = 0; return; }
      }

      render(sA, sB);
      rafId = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !rafId) rafId = requestAnimationFrame(tick);
    });
    io.observe(svg);

    if (fine.matches) window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      scene.style.willChange = "";
    };
  }, []);

  return (
    <section id="hero" className="hero-clinic">
      {/* Family footage sits behind everything and stays out of the camera
          zoom, so the faces are never cropped away. The veil washes it
          back far enough for the copy to stay readable. */}
      <video
        ref={videoRef}
        className="hero-clinic__video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        poster="/assets/img/hero/everyhealth_hero_bg.jpg"
      >
        <source src="/assets/img/hero/everyhealth.mp4" type="video/mp4" />
      </video>
      <div className="hero-clinic__veil" aria-hidden="true" />

      {/* The camera: wall, light, track and spheres all zoom as one */}
      <div className="hero-clinic__scene" aria-hidden="true">
        <div className="hero-clinic__wall" />
        <div className="hero-clinic__light" />

        <svg
          className="hero-clinic__stage"
          viewBox="0 0 1440 728"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="hcShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id="hcGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <filter id="hcSoft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="hcBallShadow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="12" />
            </filter>

            <linearGradient id="hcCore" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0" stopColor="#E3F8FF" />
              <stop offset="0.5" stopColor="#E9FFD0" />
              <stop offset="1" stopColor="#E3F8FF" />
            </linearGradient>

            <radialGradient id="hcPearl" cx="36%" cy="30%" r="78%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.45" stopColor="#f2f5f7" />
              <stop offset="0.8" stopColor="#d2d9df" />
              <stop offset="1" stopColor="#a9b4be" />
            </radialGradient>
            <radialGradient id="hcChrome" cx="38%" cy="32%" r="75%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.22" stopColor="#dde2e6" />
              <stop offset="0.55" stopColor="#7d8791" />
              <stop offset="0.82" stopColor="#2c343c" />
              <stop offset="1" stopColor="#c3cbd2" />
            </radialGradient>
            <radialGradient id="hcLens" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#e8edf1" />
              <stop offset="1" stopColor="#95a1ab" />
            </radialGradient>
          </defs>

          {/* Track and spheres */}
          <g ref={rigRef} className="hero-clinic__rig">
            {/* Cast shadows: a grey one and a faint coloured caustic, both
                thrown down-right as if lit from the upper left. */}
            <path d={TRACK} fill="none" stroke="rgba(22,40,60,0.22)" strokeWidth="102"
              transform="translate(26 33)" filter="url(#hcShadow)" />
            <path d={TRACK} fill="none" stroke="rgba(29,174,233,0.28)" strokeWidth="65"
              transform="translate(40 48)" filter="url(#hcShadow)" />

            {/* Glass body, built up outside-in for a cylindrical read */}
            <path d={TRACK} fill="none" stroke="#0E5C86" strokeWidth="96" strokeOpacity="0.92" />
            <path d={TRACK} fill="none" stroke="#1F9AD0" strokeWidth="85" />
            <path d={TRACK} fill="none" stroke="#5EC8F0" strokeWidth="60" />

            {/* Segment joints — a sparse dash on a wide stroke draws
                bands across the tube rather than along it. */}
            <path d={TRACK} fill="none" stroke="rgba(10,70,110,0.28)" strokeWidth="87"
              strokeDasharray="3 92" />

            {/* Light running through the glass */}
            <path className="hero-clinic__glow" d={TRACK} fill="none" stroke="url(#hcCore)"
              strokeWidth="31" filter="url(#hcGlow)" />
            <path d={TRACK} fill="none" stroke="#ffffff" strokeWidth="6" strokeOpacity="0.75"
              filter="url(#hcSoft)" />

            {/* Rim highlight + inner refraction streak */}
            <path d={TRACK} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="4"
              transform="translate(-20 -31)" filter="url(#hcSoft)" />
            <path d={TRACK} fill="none" stroke="rgba(8,60,95,0.35)" strokeWidth="9"
              transform="translate(17 22)" filter="url(#hcSoft)" />

            {/* Measured by the roll animation; never painted */}
            <path ref={trackRef} d={TRACK} fill="none" stroke="none" />

            {/* Care sphere — pearl with a printed cross */}
            <g ref={sphereA} transform={`translate(${REST_A} ${REST_Y})`}>
             <g transform={`scale(${ART})`}>
              <ellipse cx="24" cy="44" rx="80" ry="58" fill="rgba(20,35,50,0.32)"
                filter="url(#hcBallShadow)" />
              <circle r="78" fill="url(#hcPearl)" />
              <g ref={spinA}>
                <circle r="44" fill="none" stroke="#75C900" strokeWidth="6" />
                <rect x="-23" y="-7" width="46" height="14" rx="3" fill="#58A300" />
                <rect x="-7" y="-23" width="14" height="46" rx="3" fill="#58A300" />
              </g>
              <ellipse cx="-28" cy="-34" rx="22" ry="13" fill="#fff" opacity="0.85"
                transform="rotate(-35 -28 -34)" filter="url(#hcSoft)" />
              <circle r="77" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
             </g>
            </g>

            {/* Lens sphere — polished chrome around a clear eye */}
            <g ref={sphereB} transform={`translate(${REST_B} ${REST_Y})`}>
             <g transform={`scale(${ART})`}>
              <ellipse cx="24" cy="44" rx="80" ry="58" fill="rgba(20,35,50,0.34)"
                filter="url(#hcBallShadow)" />
              <circle r="78" fill="url(#hcChrome)" />
              <circle r="46" fill="url(#hcLens)" stroke="rgba(40,48,56,0.55)" strokeWidth="6" />
              <g ref={spinB}>
                <ellipse cx="-12" cy="-8" rx="10" ry="26" fill="#fff" opacity="0.7"
                  transform="rotate(28 -12 -8)" filter="url(#hcSoft)" />
                <ellipse cx="16" cy="14" rx="5" ry="14" fill="#fff" opacity="0.45"
                  transform="rotate(28 16 14)" />
              </g>
              <ellipse cx="-30" cy="-36" rx="20" ry="11" fill="#fff" opacity="0.9"
                transform="rotate(-35 -30 -36)" filter="url(#hcSoft)" />
             </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="container hero-clinic__inner">
        <div className="hero-clinic__copy">
          <p className="hero-clinic__eyebrow" data-aos="fade-up" data-aos-delay={200}>
            We&apos;re {brand.name}
          </p>

          <h1 data-aos="fade-up" data-aos-delay={300}>
            Coverage Guidance for <span className="hero-clinic__highlight">Every Stage of Health</span>
          </h1>

          <p className="hero-clinic__description" data-aos="fade-up" data-aos-delay={400}>
            Health coverage can feel confusing, especially when life changes quickly.
            EveryHealth helps you compare ACA, Medicare, life, dental, vision, and
            critical illness options with licensed support and clear next steps.
          </p>

          <ul className="hero-clinic__trust" data-aos="fade-up" data-aos-delay={500}>
            <li><i className="bi bi-check-lg" aria-hidden="true" /> No Cost for Our Guidance</li>
            <li><i className="bi bi-check-lg" aria-hidden="true" /> Licensed Insurance Support</li>
            <li><i className="bi bi-check-lg" aria-hidden="true" /> Health, Life, Dental and Vision</li>
          </ul>

          <div className="hero-clinic__actions" data-aos="fade-up" data-aos-delay={600}>
            <a href="#quote" className="btn btn-primary" data-quote-modal-trigger>
              Get a Free Quote
            </a>
            <AcaZipCapture variant="hero" />
          </div>

          <ul
            className="hero-clinic__periods"
            data-aos="fade-up"
            data-aos-delay={700}
            aria-label="Current enrollment periods"
          >
            {enrollmentPeriods.map((p) => {
              const status = now ? getStatus(p, now) : "idle";
              return (
                <li key={p.id} className={`hero-clinic__period is-${status}`} title={p.note}>
                  <span className="hero-clinic__dot" aria-hidden="true" />
                  <strong>{p.abbr}</strong>
                  <span>{p.display}</span>
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

          {/* Moved here from the (now disabled) top bar */}
          <ul className="hero-clinic__contact" data-aos="fade-up" data-aos-delay={800}>
            <li>
              <i className="bi bi-envelope" aria-hidden="true" />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <i className="bi bi-telephone" aria-hidden="true" />
              <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>
            </li>
          </ul>
        </div>

        {/* Reserves room for the spheres so the copy can never sit on them */}
        <div className="hero-clinic__floor" aria-hidden="true" />
      </div>
    </section>
  );
}
