export interface AccommodationType {
  value: string;
  label: string;
  desc: string;
}

export const ACCOMMODATION_TYPES: AccommodationType[] = [
  { value: 'luxury', label: 'Luxury Hotels', desc: '5-star properties & resorts' },
  { value: 'boutique', label: 'Boutique Hotels', desc: 'Unique character properties' },
  { value: 'heritage', label: 'Heritage Hotels', desc: 'Traditional architecture & culture' },
  { value: 'eco-lodge', label: 'Eco Lodges', desc: 'Sustainable & nature-focused' },
  { value: 'farmstays', label: 'Farmstays', desc: 'Authentic rural experiences' },
  { value: 'homestays', label: 'Homestays', desc: 'Local family experiences' }
];

export const ACCOMMODATION_SELECT_OPTIONS = [
  { value: 'none', label: 'None / Not Specified' },
  ...ACCOMMODATION_TYPES
];

export const NAVBAR_ACCOMMODATIONS = [
  { href: '/hotels/luxury', label: 'Luxury Hotels', desc: '5-star properties & resorts' },
  { href: '/hotels/boutique', label: 'Boutique Hotels', desc: 'Unique character properties' },
  { href: '/hotels/farmstays', label: 'Farmstays', desc: 'Authentic rural experiences' },
  { href: '/hotels/homestays', label: 'Homestays', desc: 'Local family experiences' }
];