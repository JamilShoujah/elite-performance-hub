import { brand, socialLinks } from "../config";

export function SiteFooter() {
  const footerSocialLinks = socialLinks.filter((socialLink) =>
    ["Instagram", "WhatsApp"].includes(socialLink.label),
  );

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
            {footerSocialLinks.map((socialLink) => (
              <a
                key={socialLink.label}
                href={socialLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLink.label}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-secondary-foreground/15 text-secondary-foreground/60 transition-all hover:border-primary/40 hover:text-primary"
              >
                <socialLink.icon className="h-5 w-5" />
              </a>
            ))}
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
