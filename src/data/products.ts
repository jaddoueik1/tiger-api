import { Product, ProductCategory } from '../types';

export const categories: ProductCategory[] = [
  { id: '1', name: 'Gi & Uniforms', slug: 'gi-uniforms' },
  { id: '2', name: 'Gloves & Protection', slug: 'gloves-protection' },
  { id: '3', name: 'Apparel', slug: 'apparel' },
  { id: '4', name: 'Accessories', slug: 'accessories' },
  { id: '5', name: 'Supplements', slug: 'supplements' },
];

export const products: Product[] = [
  {
    id: '1',
    sku: 'BJJ-GI-001',
    title: 'Premium BJJ Gi - Competition Grade',
    description: 'High-quality Brazilian Jiu-Jitsu gi made from durable pearl weave cotton. IBJJF approved for competition use.',
    categoryId: '1',
    images: [
      'https://images.pexels.com/photos/7045700/pexels-photo-7045700.jpeg',
    ],
    variants: [
      { id: '1-1', name: 'White - A1', price: 159, stock: 15, attributes: { color: 'White', size: 'A1' } },
      { id: '1-2', name: 'White - A2', price: 159, stock: 12, attributes: { color: 'White', size: 'A2' } },
      { id: '1-3', name: 'Blue - A2', price: 159, stock: 8, attributes: { color: 'Blue', size: 'A2' } },
      { id: '1-4', name: 'Black - A3', price: 159, stock: 5, attributes: { color: 'Black', size: 'A3' } },
    ],
    price: 159,
    stock: 40,
    attributes: [
      { key: 'material', value: 'Pearl Weave Cotton' },
      { key: 'weight', value: '550 GSM' },
      { key: 'certification', value: 'IBJJF Approved' }
    ],
    isActive: true,
  },
  {
    id: '2',
    sku: 'MT-GLOVES-001',
    title: 'Muay Thai Boxing Gloves',
    description: 'Professional-grade Muay Thai gloves with superior wrist support and hand protection.',
    categoryId: '2',
    images: [
      'https://images.pexels.com/photos/4761285/pexels-photo-4761285.jpeg',
    ],
    variants: [
      { id: '2-1', name: 'Red - 12oz', price: 89, stock: 20, attributes: { color: 'Red', weight: '12oz' } },
      { id: '2-2', name: 'Black - 14oz', price: 89, stock: 18, attributes: { color: 'Black', weight: '14oz' } },
      { id: '2-3', name: 'Blue - 16oz', price: 89, stock: 15, attributes: { color: 'Blue', weight: '16oz' } },
    ],
    price: 89,
    stock: 53,
    attributes: [
      { key: 'material', value: 'Genuine Leather' },
      { key: 'padding', value: 'Multi-layer foam' },
      { key: 'closure', value: 'Velcro wrap' }
    ],
    isActive: true,
  },
  {
    id: '3',
    sku: 'APPAREL-001',
    title: 'Gym Training Shirt',
    description: 'Moisture-wicking training shirt perfect for intense workouts and training sessions.',
    categoryId: '3',
    images: [
      'https://images.pexels.com/photos/1841849/pexels-photo-1841849.jpeg',
    ],
    variants: [
      { id: '3-1', name: 'Black - S', price: 29, stock: 25, attributes: { color: 'Black', size: 'S' } },
      { id: '3-2', name: 'Black - M', price: 29, stock: 30, attributes: { color: 'Black', size: 'M' } },
      { id: '3-3', name: 'Red - L', price: 29, stock: 20, attributes: { color: 'Red', size: 'L' } },
      { id: '3-4', name: 'Gray - XL', price: 29, stock: 15, attributes: { color: 'Gray', size: 'XL' } },
    ],
    price: 29,
    stock: 90,
    attributes: [
      { key: 'material', value: 'Polyester blend' },
      { key: 'features', value: 'Moisture-wicking' },
      { key: 'fit', value: 'Athletic' }
    ],
    isActive: true,
  },
  {
    id: '4',
    sku: 'SHIN-GUARDS-001',
    title: 'Professional Shin Guards',
    description: 'High-quality shin guards providing excellent protection for Muay Thai and MMA training.',
    categoryId: '2',
    images: [
      'https://images.pexels.com/photos/4761648/pexels-photo-4761648.jpeg',
    ],
    variants: [
      { id: '4-1', name: 'Black - S', price: 69, stock: 12, attributes: { color: 'Black', size: 'S' } },
      { id: '4-2', name: 'Red - M', price: 69, stock: 18, attributes: { color: 'Red', size: 'M' } },
      { id: '4-3', name: 'Blue - L', price: 69, stock: 10, attributes: { color: 'Blue', size: 'L' } },
    ],
    price: 69,
    stock: 40,
    attributes: [
      { key: 'material', value: 'Synthetic leather' },
      { key: 'padding', value: 'High-density foam' },
      { key: 'closure', value: 'Elastic straps' }
    ],
    isActive: true,
  },
  {
    id: '5',
    sku: 'PROTEIN-001',
    title: 'Combat Sports Protein Powder',
    description: 'Premium whey protein formulated specifically for combat sports athletes and intense training.',
    categoryId: '5',
    images: [
      'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
    ],
    variants: [
      { id: '5-1', name: 'Chocolate - 2lb', price: 49, stock: 30, attributes: { flavor: 'Chocolate', size: '2lb' } },
      { id: '5-2', name: 'Vanilla - 2lb', price: 49, stock: 25, attributes: { flavor: 'Vanilla', size: '2lb' } },
      { id: '5-3', name: 'Strawberry - 5lb', price: 99, stock: 15, attributes: { flavor: 'Strawberry', size: '5lb' } },
    ],
    price: 49,
    stock: 70,
    attributes: [
      { key: 'protein_per_serving', value: '25g' },
      { key: 'servings', value: '30' },
      { key: 'type', value: 'Whey Isolate' }
    ],
    isActive: true,
  },
];