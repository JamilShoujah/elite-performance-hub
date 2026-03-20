import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/utils/cn";

import {
  brand,
  resolveHomeHref,
  resolveSectionHref,
  sectionNavigation,
  type HomeSectionId,
} from "../config";

export function SiteHeader() {
  const { pathname } = useLocation();
  const isExerciseLibraryRoute = pathname.startsWith("/exercises");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<HomeSectionId | null>(
    null,
  );

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
    if (pathname !== "/") {
      setActiveSectionId(null);
      return;
    }

    const resolveActiveSection = () => {
      const activationLine = window.innerHeight * 0.32;
      let nextActiveSectionId: HomeSectionId | null = null;

      for (const item of sectionNavigation) {
        const sectionElement = document.getElementById(item.sectionId);

        if (!sectionElement) {
          continue;
        }

        const sectionBounds = sectionElement.getBoundingClientRect();

        if (
          sectionBounds.top <= activationLine &&
          sectionBounds.bottom >= activationLine
        ) {
          nextActiveSectionId = item.sectionId;
          break;
        }

        if (sectionBounds.top <= activationLine) {
          nextActiveSectionId = item.sectionId;
        }
      }

      if (window.scrollY < 120) {
        nextActiveSectionId = null;
      }

      setActiveSectionId(nextActiveSectionId);
    };

    let animationFrameId = 0;
    const scheduleActiveSectionSync = () => {
      if (animationFrameId !== 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = 0;
        resolveActiveSection();
      });
    };

    resolveActiveSection();
    window.addEventListener("scroll", scheduleActiveSectionSync, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveSectionSync);

    return () => {
      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", scheduleActiveSectionSync);
      window.removeEventListener("resize", scheduleActiveSectionSync);
    };
  }, [pathname]);

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
  const mobileLinkClassName =
    "text-sm font-medium text-foreground transition-colors hover:text-primary";
  const getDesktopLinkClassName = (isActive: boolean) =>
    cn(
      "text-sm transition-colors",
      isOverlayHeader
        ? isActive
          ? "font-bold text-secondary-foreground"
          : "font-medium text-secondary-foreground/70 hover:text-primary"
        : isActive
          ? "font-bold text-foreground"
          : "font-medium text-muted-foreground hover:text-primary",
    );

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
              isOverlayHeader ? "text-secondary-foreground" : "text-foreground",
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
                className={getDesktopLinkClassName(
                  pathname === "/" && activeSectionId === item.sectionId,
                )}
              >
                {item.label}
              </a>
            ))}

            <Link
              to="/exercises"
              className={getDesktopLinkClassName(isExerciseLibraryRoute)}
            >
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
                ? "text-secondary-foreground hover:bg-secondary-foreground/10"
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
