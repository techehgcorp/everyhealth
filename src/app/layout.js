import "./globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import QuoteModal from "@/components/QuoteModal";
import RouteScriptRefresh from "@/components/RouteScriptRefresh";
import TopBar from "@/components/TopBar";
import { writableStates } from "@/data/states";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const SITE_TITLE = brand.title;
const SITE_DESCRIPTION = brand.description;

export const metadata = {
  // Required for relative OpenGraph image paths to resolve to absolute URLs.
  // Without this, Facebook and LinkedIn cannot load your share image.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${brand.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "EveryHealth",
    "Every Health Group",
    "independent insurance brokerage",
    "health insurance",
    "life insurance",
    "Medicare plans",
    "ACA health insurance",
    "critical illness insurance",
    "final expense insurance",
    "dental insurance",
    "vision insurance",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: brand.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: brand.shareImage,
        width: 1200,
        height: 630,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [brand.shareImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: brand.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${brand.logo}`,
  description: SITE_DESCRIPTION,
  telephone: brand.phoneHref,
  email: brand.email,
  ...(brand.address.streetAddress ? { address: {
    "@type": "PostalAddress",
    ...brand.address,
  } } : {}),
  // Derived from src/data/states.js so the schema can never drift from
  // reality. areaServed means "where can this business actually help me",
  // so it lists states where business can be written today — a narrower
  // set than the 30+ states where licenses are held.
  areaServed: writableStates.map((s) => ({
    "@type": "State",
    name: s.name,
  })),
  sameAs: [brand.facebookUrl, brand.instagramUrl].filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        />
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" href="/assets/vendor/glightbox/css/glightbox.min.css" />
        <link rel="stylesheet" href="/assets/vendor/fontawesome-free/css/all.min.css" />
        <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <header id="header" className="header fixed-top">
          <TopBar />
          <NavBar />
        </header>
        {children}
        <QuoteModal />
        <Footer />
        <RouteScriptRefresh />
        <a
          href="#!"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
          aria-label="Scroll to top"
        >
          <i className="bi bi-arrow-up-short" />
        </a>
        <div id="preloader"></div>
        <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/php-email-form/validate.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/aos/aos.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/purecounter/purecounter_vanilla.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
        <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a9df971ba70a028e784f534"
        data-source="WEB_USER"
        strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
