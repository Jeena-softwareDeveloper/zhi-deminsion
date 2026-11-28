export const BRAND_INFO = {
  name: 'ZHI DIMENSION',
  tagline: 'Built with Purpose. Made for Progress.',
  subtitle: 'Innovative Products for Agriculture, Homes & Industries.',
  positioning: 'An Independent Product Manufacturing Brand',
  whatsappNumber: '919876543210',
  phoneDisplay: '+91 98765 43210',
  email: 'sales@zhidimension.com',
  hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  location: 'Erode, Tamil Nadu, India',
} as const;

export const APPROVED_CATEGORIES = [
  'Agriculture',
  'Home & Residential',
  'Industrial',
] as const;

export type ApprovedCategory = (typeof APPROVED_CATEGORIES)[number];

export interface CategoryMeta {
  name: ApprovedCategory;
  slug: string;
  navLabel: string;
  description: string;
  href: string;
}

export interface NavCategoryItem {
  name: string;
  slug: string;
  href: string;
}

export const CATEGORY_DETAILS: CategoryMeta[] = [
  {
    name: 'Agriculture',
    slug: 'agriculture',
    navLabel: 'Agriculture',
    description:
      'Products developed for farmers, agricultural operations and everyday field productivity.',
    href: '/products?category=Agriculture',
  },
  {
    name: 'Home & Residential',
    slug: 'home-residential',
    navLabel: 'Home & Residential',
    description:
      'Products manufactured for practical everyday household and residential applications.',
    href: '/products?category=Home+%26+Residential',
  },
  {
    name: 'Industrial',
    slug: 'industrial',
    navLabel: 'Industries',
    description:
      'Products developed for dependable commercial and industrial operations.',
    href: '/products?category=Industrial',
  },
];

export const DEFAULT_NAV_CATEGORIES: NavCategoryItem[] = CATEGORY_DETAILS.map((c) => ({
  name: c.name,
  slug: c.slug,
  href: c.href,
}));

/**
 * Fetch active product categories with fallback to static defaults.
 */
export async function fetchActiveNavCategories(): Promise<NavCategoryItem[]> {
  try {
    const res = await fetch('/api/categories?activeOnly=true');
    const data = await res.json();
    if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
      return data.categories.map((c: { name: string; slug?: string }) => ({
        name: c.name,
        slug: c.slug || c.name,
        href: `/products?category=${encodeURIComponent(c.name)}`,
      }));
    }
  } catch {
    // Keep static CATEGORY_DETAILS fallback
  }
  return DEFAULT_NAV_CATEGORIES;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello ZHI DIMENSION, I am interested in your products. Please share your bulk order details.';

/**
 * Build a WhatsApp click-to-chat URL with a pre-filled bulk enquiry message.
 */
export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a product-specific WhatsApp bulk enquiry URL.
 */
export function getProductWhatsAppUrl(
  productName: string,
  category?: string,
  quantity?: string
): string {
  const details = [
    `Hello ZHI DIMENSION, I am interested in bulk orders for *${productName}*`,
    category ? ` (${category})` : '',
    '. Please share bulk order details',
    quantity ? ` for quantity: ${quantity}` : '',
    '.',
  ].join('');
  return getWhatsAppUrl(details);
}
