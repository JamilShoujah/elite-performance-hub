import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
          AHMED<span className="text-primary">.</span>SAAD
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Programs", "Specializations", "About", "Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="/exercises"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Exercise Library
          </a>
        </div>
        <a
          href="#contact"
          className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold rounded-sm hover:opacity-90 transition-opacity"
        >
          Apply Now
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
