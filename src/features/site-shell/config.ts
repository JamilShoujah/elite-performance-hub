import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export type HomeSectionId =
  | "programs"
  | "specializations"
  | "about"
  | "reviews"
  | "contact";

export interface SectionNavigationItem {
  label: string;
  sectionId: HomeSectionId;
}

interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const brand = {
  role: "Performance Coach",
  titleParts: ["AHMAD", "SAAD"] as const,
};

export const sectionNavigation: SectionNavigationItem[] = [
  { label: "Programs", sectionId: "programs" },
  { label: "Specializations", sectionId: "specializations" },
  { label: "About", sectionId: "about" },
  { label: "Reviews", sectionId: "reviews" },
  { label: "Contact", sectionId: "contact" },
];

export const socialLinks: SocialLink[] = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "https://wa.me/1234567890", icon: MessageCircle, label: "WhatsApp" },
  { href: "mailto:contact@ahmadsaad.com", icon: Mail, label: "Email" },
];

export function resolveSectionHref(pathname: string, sectionId: HomeSectionId) {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}

export function resolveHomeHref(pathname: string) {
  return pathname === "/" ? "#top" : "/";
}
