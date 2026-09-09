export interface PromoItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  discount_sgd?: number;
  description: string;
  benefits: string[];
  terms_conditions: string[];
  valid_until: string;
  image_url: string;
  highlight_color?: string; // e.g. 'amber', 'emerald', 'sky', 'purple'
  cta_text: string;
  cta_whatsapp_text: string;
  is_featured: boolean;
}
