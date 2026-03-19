import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/utils/cn";

import { brand, resolveHomeHref, resolveSectionHref, sectionNavigation } from "../config";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 50);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState);

    return () => {
      window.removeEventListener("scroll", syncScrollState);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncMenuState = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", syncMenuState);

    return () => {
      window.removeEventListener("resize", syncMenuState);
    };
  }, []);

  const isOverlayHeader = pathname === "/" && !isScrolled && !isMenuOpen;
  const linkClassName = cn(
    "text-sm font-medium transition-colors",
    isOverlayHeader
      ? "text-white/70 hover:text-white"
      : "text-muted-foreground hover:text-foreground",
  );
  const mobileLinkClassName =
    "text-sm font-medium text-foreground transition-colors hover:text-primary";

  return (
    <motion.nav
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isOverlayHeader
          ? "bg-transparent"
          : "border-b border-border bg-background/90 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <a
            href={resolveHomeHref(pathname)}
            className={cn(
              "font-display text-xl font-bold tracking-tight transition-colors",
              isOverlayHeader ? "text-white" : "text-foreground",
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {brand.titleParts[0]}
            <span className="text-primary">.</span>
            {brand.titleParts[1]}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {sectionNavigation.map((item) => (
              <a
                key={item.sectionId}
                href={resolveSectionHref(pathname, item.sectionId)}
                className={linkClassName}
              >
                {item.label}
              </a>
            ))}

            <Link to="/exercises" className={linkClassName}>
              Exercise Library
            </Link>
          </div>

          <button
            type="button"
            aria-controls="mobile-site-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-sm transition-colors md:hidden",
              isOverlayHeader
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-muted",
            )}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              id="mobile-site-navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border/80 py-4 md:hidden"
            >
              <div className="flex flex-col gap-4">
                {sectionNavigation.map((item) => (
                  <a
                    key={item.sectionId}
                    href={resolveSectionHref(pathname, item.sectionId)}
                    className={mobileLinkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                <Link
                  to="/exercises"
                  className={mobileLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Exercise Library
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
