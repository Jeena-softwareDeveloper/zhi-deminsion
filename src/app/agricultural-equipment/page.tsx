import { redirect } from 'next/navigation';

export default function AgriculturalRedirectPage() {
  redirect('/products?category=Agriculture');
}
