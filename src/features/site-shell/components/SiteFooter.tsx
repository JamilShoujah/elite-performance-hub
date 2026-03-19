import { useLocation } from "react-router-dom";

import { brand, resolveSectionHref, sectionNavigation, socialLinks } from "../config";

export function SiteFooter() {
  const { pathname } = useLocation();

  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <span className="font-display text-xl font-bold text-secondary-foreground">
              {brand.titleParts[0]}
              <span className="text-primary">.</span>
              {brand.titleParts[1]}
            </span>
            <p className="mt-1 text-xs text-secondary-foreground/50">{brand.role}</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.label}
                href={socialLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLink.label}
                className="text-secondary-foreground/50 transition-colors hover:text-primary"
              >
                <socialLink.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs text-secondary-foreground/50">
            {sectionNavigation
              .filter((item) =>
                ["programs", "about", "contact"].includes(item.sectionId),
              )
              .map((item) => (
                <a
                  key={item.sectionId}
                  href={resolveSectionHref(pathname, item.sectionId)}
                  className="transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            <a href="/exercises" className="transition-colors hover:text-primary">
              Exercises
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-xs text-secondary-foreground/30">
            © {new Date().getFullYear()} {brand.titleParts.join(" ")}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
