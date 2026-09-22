import { brand } from "@/lib/brand";

export default function TopBar() {
  return (
    <div className="topbar d-flex align-items-center dark-background">
      <div className="container position-relative d-flex align-items-center justify-content-center">
        <div className="contact-info d-flex align-items-center">
          <i className="bi bi-envelope d-flex align-items-center">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </i>
          <i className="bi bi-phone d-flex align-items-center ms-4">
            <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>
          </i>
        </div>
        <div className="social-links d-flex align-items-center position-absolute end-0">
          {brand.facebookUrl && (
            <a
              href={brand.facebookUrl}
              className="facebook"
              aria-label={`${brand.name} on Facebook`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook" />
            </a>
          )}
          {brand.instagramUrl && (
            <a
              href={brand.instagramUrl}
              className="instagram"
              aria-label={`${brand.name} on Instagram`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
