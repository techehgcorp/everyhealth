"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publishedProducts, productHref } from "@/data/products";
import { publishedGuides, guideHref } from "@/data/guides";
import { brand } from "@/lib/brand";

// ─── Coverage mega panel ────────────────────────────────────────────────────
// Columns are derived from src/data/products.js so the nav can never drift
// from the pages that actually exist. Each product carries a `navGroup` field
// that decides which column it lands in.
const COVERAGE_GROUPS = [
  { id: "health", label: "Health and Medicare" },
  { id: "life", label: "Life and Legacy" },
  { id: "everyday", label: "Everyday Benefits" },
];

// A product without a navGroup still renders rather than silently vanishing
// from the nav. If one turns up in the wrong column, the fix is a navGroup in
// products.js, not a change here.
const groupOf = (product) => product.navGroup ?? "everyday";

const coverageColumns = COVERAGE_GROUPS.map((group) => ({
  ...group,
  items: publishedProducts
    .filter((product) => groupOf(product) === group.id)
    .map((product) => ({
      href: productHref(product.slug),
      label: product.navLabel,
    })),
})).filter((column) => column.items.length > 0);

// Self enrollment used to be a top-level nav item for three partner links.
// It now lives as a footer strip inside the Coverage panel — same links,
// none of the horizontal real estate.
const selfEnrollmentPages = [
  { href: "/self-enrollment/one-share", label: "One Share" },
  { href: "/self-enrollment/ameritas", label: "Ameritas" },
  { href: "/self-enrollment/ncd", label: "NCD" },
];

// ─── Learn mega panel ───────────────────────────────────────────────────────
// Guides were previously unreachable from the nav entirely.
const guideLinks = publishedGuides.map((guide) => ({
  href: guideHref(guide.slug),
  label: guide.navLabel,
}));

const learnColumns = [
  { id: "guides", label: "Guides", items: guideLinks },
  {
    id: "help",
    label: "Answers",
    items: [
      { href: "/faq", label: "Frequently Asked Questions" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
].filter((column) => column.items.length > 0);

// ─── About dropdown ─────────────────────────────────────────────────────────
// Plain dropdown, not a mega panel — it reuses the existing .navmenu ul
// styling so no new CSS is needed for this one.
const aboutPages = [
  { href: "/about", label: "Our Story" },
  { href: "/team", label: "Our Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

// Terms and Privacy deliberately live in the footer only.

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

// A top-level item highlights on any route inside its section, including
// pages that aren't listed in the menu.
function inSection(pathname, prefixes) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function NavBar2() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navRef = useRef(null);
  const triggerRefs = useRef({});

  const coverageActive = inSection(pathname, ["/products", "/self-enrollment", "/aca-quote"]);
  const learnActive = inSection(pathname, ["/guides", "/faq", "/testimonials"]);
  const aboutActive = inSection(pathname, [
    "/about",
    "/team",
    "/careers",
    "/contact",
  ]);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setIsMobileNavOpen(false);
  }, []);

  // Only one panel open at a time.
  const toggleMenu = (name) =>
    setOpenMenu((current) => (current === name ? null : name));

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Escape closes the open panel and returns focus to the trigger that
  // opened it, which is the bit keyboard users notice when it's missing.
  useEffect(() => {
    if (!openMenu && !isMobileNavOpen) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (openMenu) {
        const trigger = triggerRefs.current[openMenu];
        setOpenMenu(null);
        trigger?.focus();
        return;
      }

      setIsMobileNavOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, isMobileNavOpen]);

  useEffect(() => {
    if (!openMenu && !isMobileNavOpen) return;

    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAll();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu, isMobileNavOpen, closeAll]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", isMobileNavOpen);
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    document.documentElement.style.overflow = isMobileNavOpen ? "hidden" : "";

    return () => {
      document.body.classList.remove("mobile-nav-active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1200) setIsMobileNavOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const renderMegaColumns = (columns) => (
    <div className="mega-panel__grid">
      {columns.map((column) => (
        <div className="mega-panel__col" key={column.id}>
          <p className="mega-panel__heading">{column.label}</p>
          <div className="mega-panel__links">
            {column.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "active" : undefined}
                onClick={closeAll}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`branding d-flex align-items-center${
        pathname === "/" ? " hero-page" : ""
      }`}
    >
      {/* position-relative removed: the mega panels position against
          .branding so they can span the full header width. */}
      <div className="container d-flex align-items-center justify-content-between">
        <Link
          href="/"
          className="logo d-flex align-items-center"
          onClick={closeAll}
        >
          <img src={brand.logo} alt={brand.name} className="navbar-logo-img" />
        </Link>

        <nav id="navmenu" className="navmenu" ref={navRef}>
          <ul>
            {/* ── Coverage ── */}
            <li
              className={`dropdown has-mega${
                openMenu === "coverage" ? " is-open" : ""
              }`}
            >
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current.coverage = el;
                }}
                className={`nav-trigger${
                  coverageActive || openMenu === "coverage" ? " active" : ""
                }`}
                aria-expanded={openMenu === "coverage"}
                aria-haspopup="true"
                aria-controls="mega-coverage"
                onClick={() => toggleMenu("coverage")}
              >
                <span>Coverage</span>
                <i className="bi bi-chevron-down toggle-dropdown" aria-hidden="true" />
              </button>

              <div
                id="mega-coverage"
                className={`mega-panel${
                  openMenu === "coverage" ? " is-open" : ""
                }`}
                hidden={openMenu !== "coverage"}
              >
                <div className="container mega-panel__inner">
                  {renderMegaColumns(coverageColumns)}

                  <div className="mega-panel__footer">
                    <Link
                      href="/products"
                      className="mega-panel__hub"
                      onClick={closeAll}
                    >
                      All Products
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                    <Link href="/aca-quote" className="mega-panel__hub" onClick={closeAll}>
                      See ACA Plans and Prices
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>

                    <p className="mega-panel__enroll">
                      <span>Prefer to enroll yourself?</span>{" "}
                      {selfEnrollmentPages.map((item, index) => (
                        <Fragment key={item.href}>
                          {index > 0 && (
                            <span aria-hidden="true" className="mega-panel__sep">
                              ·
                            </span>
                          )}
                          <Link href={item.href} onClick={closeAll}>
                            {item.label}
                          </Link>
                        </Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </li>

            {/* ── Learn ── */}
            <li
              className={`dropdown has-mega${
                openMenu === "learn" ? " is-open" : ""
              }`}
            >
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current.learn = el;
                }}
                className={`nav-trigger${
                  learnActive || openMenu === "learn" ? " active" : ""
                }`}
                aria-expanded={openMenu === "learn"}
                aria-haspopup="true"
                aria-controls="mega-learn"
                onClick={() => toggleMenu("learn")}
              >
                <span>Learn</span>
                <i className="bi bi-chevron-down toggle-dropdown" aria-hidden="true" />
              </button>

              <div
                id="mega-learn"
                className={`mega-panel mega-panel--narrow${
                  openMenu === "learn" ? " is-open" : ""
                }`}
                hidden={openMenu !== "learn"}
              >
                <div className="container mega-panel__inner">
                  {renderMegaColumns(learnColumns)}

                  <div className="mega-panel__footer">
                    <Link
                      href="/guides"
                      className="mega-panel__hub"
                      onClick={closeAll}
                    >
                      All Guides
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* ── About ── (plain dropdown, existing CSS) */}
            <li className={`dropdown${openMenu === "about" ? " is-open" : ""}`}>
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current.about = el;
                }}
                className={`nav-trigger${
                  aboutActive || openMenu === "about" ? " active" : ""
                }`}
                aria-expanded={openMenu === "about"}
                aria-haspopup="true"
                aria-controls="dropdown-about"
                onClick={() => toggleMenu("about")}
              >
                <span>About</span>
                <i className="bi bi-chevron-down toggle-dropdown" aria-hidden="true" />
              </button>

              <ul
                id="dropdown-about"
                className={openMenu === "about" ? "dropdown-active" : undefined}
              >
                {aboutPages.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        isActive(pathname, item.href) ? "active" : undefined
                      }
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* ── CTAs — both permanent now that there's room ── */}
            <li className="appointment-nav-item">
              <Link
                href="/appointment"
                className={`appointment-nav-button${
                  isActive(pathname, "/appointment") ? " active" : ""
                }`}
                onClick={closeAll}
              >
                Appointment
              </Link>
            </li>

            <li className="quote-nav-item is-visible">
              <a
                href="#quote"
                className="quote-nav-button"
                data-quote-modal-trigger
                onClick={closeAll}
              >
                Get a Quote
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={`mobile-nav-toggle d-xl-none bi ${
              isMobileNavOpen ? "bi-x" : "bi-list"
            }`}
            aria-label={
              isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMobileNavOpen}
            aria-controls="navmenu"
            onClick={() => setIsMobileNavOpen((current) => !current)}
          />
        </nav>
      </div>
    </div>
  );
}
