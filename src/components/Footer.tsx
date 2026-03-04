import { Instagram, Facebook, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-display text-xl font-bold text-secondary-foreground">
              AHMED<span className="text-primary">.</span>SAAD
            </span>
            <p className="text-secondary-foreground/50 text-xs mt-1">Elite Performance Coach</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: MessageCircle, href: "https://wa.me/1234567890" },
              { icon: Mail, href: "mailto:contact@ahmedsaad.com" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/50 hover:text-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs text-secondary-foreground/50">
            <a href="#programs" className="hover:text-primary transition-colors">Programs</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Apply</a>
            <a href="/exercises" className="hover:text-primary transition-colors">Exercises</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-foreground/10 text-center">
          <p className="text-xs text-secondary-foreground/30">
            © {new Date().getFullYear()} Ahmed Saad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
