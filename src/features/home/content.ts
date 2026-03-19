import {
  Activity,
  Award,
  Clock,
  Dumbbell,
  Flame,
  Gamepad2,
  Move,
  Shield,
  Target,
  TrendingUp,
  Users,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface StatHighlight {
  label: string;
  suffix: string;
  value: number;
}

export interface HeroTrustSignal {
  icon: LucideIcon;
  label: string;
}

export interface Program {
  bestFor: string;
  features: string[];
  isLimited?: boolean;
  isPopular?: boolean;
  period: string;
  price: string;
  result: string;
  sessions: string;
  title: string;
}

export interface Specialization {
  description: string;
  icon: LucideIcon;
  title: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
}

export interface GalleryImage {
  alt: string;
  src: string;
}

export interface CoachMetric {
  icon: LucideIcon;
  label: string;
}

export const heroTrustSignals: HeroTrustSignal[] = [
  { icon: Shield, label: "Trusted by 100+ Clients" },
  { icon: TrendingUp, label: "Proven Transformation Systems" },
  { icon: Target, label: "Structured Methodology" },
];

export const socialProofStats: StatHighlight[] = [
  { label: "Years Experience", suffix: "+", value: 6 },
  { label: "Clients Trained", suffix: "+", value: 100 },
  { label: "Transformation Rate", suffix: "%", value: 95 },
  { label: "Client Retention", suffix: "%", value: 92 },
];

export const programs: Program[] = [
  {
    bestFor: "Remote professionals seeking structured programming",
    features: [
      "Personalized training programs",
      "Weekly video check-ins",
      "Progressive overload tracking",
      "Recovery protocols",
      "Direct coach messaging",
    ],
    period: "/month",
    price: "$400",
    result: "Build elite-level fitness from anywhere.",
    sessions: "10 Sessions",
    title: "Online Performance Coaching",
  },
  {
    bestFor: "Athletes and executives who demand hands-on coaching",
    features: [
      "In-person training sessions",
      "Real-time form correction",
      "Performance assessments",
      "Custom periodization",
      "Priority scheduling",
    ],
    isLimited: true,
    isPopular: true,
    period: "",
    price: "$350",
    result: "Maximize performance with direct coaching.",
    sessions: "10 Sessions",
    title: "1-on-1 Private Coaching",
  },
  {
    bestFor: "Self-driven individuals who need expert programming",
    features: [
      "Periodized training blocks",
      "Exercise video library access",
      "Monthly program updates",
      "Progress tracking tools",
    ],
    period: "/month",
    price: "$200",
    result: "Train with purpose. Every session counts.",
    sessions: "Monthly",
    title: "Custom Workout Programming",
  },
  {
    bestFor: "Those ready to optimize fuel for performance",
    features: [
      "Macro-optimized meal plans",
      "Supplement guidance",
      "Body composition tracking",
      "Bi-weekly adjustments",
    ],
    period: "/month",
    price: "$150",
    result: "Fuel the machine. Optimize results.",
    sessions: "Monthly",
    title: "Performance Nutrition Planning",
  },
];

export const specializations: Specialization[] = [
  {
    description: "Race-specific conditioning and endurance programming.",
    icon: Flame,
    title: "Hyrox Training",
  },
  {
    description: "Functional core strength for performance and injury prevention.",
    icon: Activity,
    title: "Core Development",
  },
  {
    description: "Joint health, flexibility, and movement quality systems.",
    icon: Move,
    title: "Mobility Optimization",
  },
  {
    description: "Speed, power, and agility for competitive athletes.",
    icon: Zap,
    title: "Athletic Performance",
  },
  {
    description: "Energy system development for peak cardiovascular output.",
    icon: Wind,
    title: "Conditioning Systems",
  },
  {
    description: "Real-world strength and movement patterns.",
    icon: Dumbbell,
    title: "Functional Fitness",
  },
  {
    description: "Cognitive endurance, posture, and recovery for gamers.",
    icon: Gamepad2,
    title: "Esports Performance",
  },
];

export const aboutHighlights = [
  "Training for all levels — beginners to competitive athletes",
  "Structured, periodized training philosophy",
  "Results-driven mindset with measurable outcomes",
  "No shortcuts — only proven systems",
  "Personalized approach for every individual",
];

export const coachMetrics: CoachMetric[] = [
  { icon: Award, label: "Certified Trainer" },
  { icon: Clock, label: "6+ Years" },
  { icon: Users, label: "100+ Trainees" },
];

export const reviews: Review[] = [
  {
    name: "Omar K.",
    rating: 5,
    text: "Ahmad's coaching transformed my fitness in 3 months. His structured approach is unlike anything I've experienced.",
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "I came in overworked and undertrained. Ahmad built a system that fit my schedule and pushed me to results I didn't think were possible.",
  },
  {
    name: "Youssef A.",
    rating: 5,
    text: "As a Hyrox competitor, I needed specialized training. Ahmad's programming took 8 minutes off my race time in one season.",
  },
  {
    name: "Layla H.",
    rating: 5,
    text: "Professional, disciplined, results-driven. Ahmad doesn't waste your time — every session has purpose. Best investment in myself.",
  },
  {
    name: "Khaled R.",
    rating: 5,
    text: "I've worked with many trainers. Ahmad is the only one who treated my goals like his own. Genuine, focused, and effective.",
  },
];

export const certifications = [
  "Personal Trainer Certificate — SAS (Sports School Academy)",
  "Post Rehab Trainer Certificate — SAS",
  "Beyond the Game: Sports Health & Performance — Lebanese Order of Physicians, Beirut",
  "Building Elite Athletes Workshop — NCSF Middle East",
  "E-Sports High Performance Training — NCSF Middle East",
];

export const trainingGallery: GalleryImage[] = [
  {
    alt: "Athlete performing a loaded squat during a coaching session",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
  {
    alt: "Coach guiding an athlete through functional conditioning",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
  },
  {
    alt: "Athlete training with focused supervision in the gym",
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop",
  },
];

export const fitnessLevels = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
  { label: "Competitive Athlete", value: "athlete" },
];
