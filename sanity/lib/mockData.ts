export interface MockProduct {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  themeZone: 'spiritual' | 'modern' | 'artistic';
  images: any[]; // Can be strings or asset structures
  description: any[]; // Portable text
  dimensions?: string;
  material?: string;
  featured?: boolean;
  viewCount: number;
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    _id: 'mock-jhula-1',
    name: 'Royal Maharaja Teakwood Swing',
    slug: { current: 'royal-maharaja-teakwood-swing' },
    category: 'wooden-swing',
    themeZone: 'spiritual',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800',
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Crafted from pure, seasoned grade-A teakwood. This royal swing features intricate dual-side carvings representing classic Indian court styles. Hand-polished in rich walnut with subtle gold leaf highlights. Supported by pure brass chains with interlocking links for absolute durability.',
          },
        ],
      },
    ],
    dimensions: '6.5ft W x 4.5ft H x 2.5ft D',
    material: 'Grade-A Teakwood & Brass Fittings',
    featured: true,
    viewCount: 142,
  },
  {
    _id: 'mock-mandir-1',
    name: 'Korean Acrylic Backlit Mandir',
    slug: { current: 'korean-acrylic-backlit-mandir' },
    category: 'korean-mandir',
    themeZone: 'spiritual',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A modern masterpiece. Fabricated using high-grade, seamless Korean solid surface acrylic. Features custom CNC-carved backlit panels showing geometric mandala motifs. Equipped with warm, dimmable LED units and multiple drawers for pooja accessories.',
          },
        ],
      },
    ],
    dimensions: '4ft W x 5.5ft H x 1.8ft D',
    material: 'Korean Solid Surface Acrylic & Warm LEDs',
    featured: true,
    viewCount: 289,
  },
  {
    _id: 'mock-sofa-1',
    name: 'Chesterfield Velvet 3-Seater Sofa',
    slug: { current: 'chesterfield-velvet-3-seater-sofa' },
    category: 'sofa',
    themeZone: 'modern',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800',
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A clean, modern take on the traditional Chesterfield. Features high-density 40-grade foam cushioning upholstered in rich forest-green velvet. Structured with a seasoned Neemwood frame and matte-black powder-coated steel legs.',
          },
        ],
      },
    ],
    dimensions: '7.2ft W x 3ft H x 3.2ft D',
    material: 'Velvet, Neemwood & Powder-coated Steel',
    featured: true,
    viewCount: 195,
  },
  {
    _id: 'mock-tv-1',
    name: 'Minimalist Floating Console Unit',
    slug: { current: 'minimalist-floating-console-unit' },
    category: 'tv-unit',
    themeZone: 'modern',
    images: [
      'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=800',
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Clean architectural profiles designed to organize your entertainment wall. Includes soft-close handle-less flip drawers with premium Blum hinges. Sleek wire management grommets are built internally.',
          },
        ],
      },
    ],
    dimensions: '6ft W x 1.2ft H x 1.4ft D',
    material: 'High Moisture Resistant (HMR) Board & Walnut Veneer',
    featured: false,
    viewCount: 88,
  },
  {
    _id: 'mock-cnc-1',
    name: 'Geometric Fretwork Partition Screen',
    slug: { current: 'geometric-fretwork-partition-screen' },
    category: 'cnc-2d',
    themeZone: 'artistic',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800',
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Precision 2D router-cut room divider panels. Perfect for dividing living and dining sections. Cut from high-density MDF boards with a premium charcoal matte paint finish. Frame profile is reinforced to prevent warp.',
          },
        ],
      },
    ],
    dimensions: '4ft W x 8ft H x 1.5inch Thickness',
    material: 'High-Density Fiberboard (MDF) & Matte Lacquer',
    featured: true,
    viewCount: 76,
  },
  {
    _id: 'mock-cnc-2',
    name: '3D Bas-Relief Lotus Wall Panel',
    slug: { current: '3d-bas-relief-lotus-wall-panel' },
    category: 'cnc-3d',
    themeZone: 'artistic',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
    ],
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Intricate 3D carving showcasing a floating lotus pond motif. Carved on state-of-the-art multi-axis CNC machines using solid White Oak boards. Perfect as a focal installation in entryways, staircases, or temple backdrops.',
          },
        ],
      },
    ],
    dimensions: '3ft W x 6ft H x 2inch Thickness',
    material: 'Solid White Oak & Protective Wax Polish',
    featured: false,
    viewCount: 112,
  },
];
