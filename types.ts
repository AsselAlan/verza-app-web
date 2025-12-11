import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  link: string;
  images?: string[];
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface Testimonial {
  name: string;
  role: string;
  business: string;
  content: string;
  stars: number;
  image?: string;
}

export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

export interface ChatScenario {
  id: string;
  name: string;
  initialMessage: string;
  suggestions: string[];
  responses: Record<string, string>;
  fallback: string;
  businessName?: string;
  color?: string;
}