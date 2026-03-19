import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/utils/cn";

import { brand, resolveHomeHref, resolveSectionHref, sectionNavigation } from "../config";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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

  const isOverlayHeader = pathname === "/" && !isScrolled;
  const linkClassName = cn(
    "text-sm font-medium transition-colors",
    isOverlayHeader
      ? "text-white/70 hover:text-white"
      : "text-muted-foreground hover:text-foreground",
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
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href={resolveHomeHref(pathname)}
          className={cn(
            "font-display text-xl font-bold tracking-tight transition-colors",
            isOverlayHeader ? "text-white" : "text-foreground",
          )}
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
      </div>
    </motion.nav>
  );
}
