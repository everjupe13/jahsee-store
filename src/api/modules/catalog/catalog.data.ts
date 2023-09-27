import { ICatalog, IProduct } from './catalog.types'

export const CATALOG_DATA: ICatalog[] = [
  {
    id: 0,
    dropSlug: 'first-drop',
    name: 'Heading',
    thumbImage: new URL(
      '@/assets/img/catalog/1st-drop-plug.png',
      import.meta.url
    ).href,
    video: new URL('@/assets/media/catalog-video-plug.mp4', import.meta.url)
      .href,
    videoPoster: new URL(
      '@/assets/media/catalog-video-plug-poster.png',
      import.meta.url
    ).href,
    isCatalogExpanded: true,
    status: 'active',
    yearTag: 'Q2 2023',
    products: [
      {
        id: 0,
        productName: 'Zip hoodie',
        thumbImage: new URL(
          '@/assets/img/products/zip-hoodie-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 1,
        productName: 'Sweatshirt',
        thumbImage: new URL(
          '@/assets/img/products/sweatshirt-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 2,
        productName: 'Zip hoodie',
        thumbImage: new URL(
          '@/assets/img/products/zip-hoodie-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 3,
        productName: 'Sweatshirt',
        thumbImage: new URL(
          '@/assets/img/products/sweatshirt-plug/1.png',
          import.meta.url
        ).href
      }
    ]
  },
  {
    id: 1,
    dropSlug: 'second-drop',
    name: 'Heading',
    thumbImage: new URL(
      '@/assets/img/catalog/2nd-drop-plug.png',
      import.meta.url
    ).href,
    video: undefined,
    videoPoster: undefined,
    isCatalogExpanded: false,
    status: 'sold_out',
    yearTag: 'Q2 2023',
    products: [
      {
        id: 4,
        productName: 'Zip hoodie',
        thumbImage: new URL(
          '@/assets/img/products/zip-hoodie-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 5,
        productName: 'Sweatshirt',
        thumbImage: new URL(
          '@/assets/img/products/sweatshirt-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 6,
        productName: 'Zip hoodie',
        thumbImage: new URL(
          '@/assets/img/products/zip-hoodie-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 7,
        productName: 'Sweatshirt',
        thumbImage: new URL(
          '@/assets/img/products/sweatshirt-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 8,
        productName: 'Zip hoodie',
        thumbImage: new URL(
          '@/assets/img/products/zip-hoodie-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 9,
        productName: 'Sweatshirt',
        thumbImage: new URL(
          '@/assets/img/products/sweatshirt-plug/1.png',
          import.meta.url
        ).href
      }
    ]
  },
  {
    id: 2,
    dropSlug: 'third-drop',
    name: 'Heading',
    thumbImage: new URL(
      '@/assets/img/catalog/3rd-drop-plug.png',
      import.meta.url
    ).href,
    video: undefined,
    videoPoster: undefined,
    isCatalogExpanded: false,
    status: 'active',
    yearTag: 'Q2 2023',
    products: [
      {
        id: 10,
        productName: 'Zip hoodie',
        thumbImage: new URL(
          '@/assets/img/products/zip-hoodie-plug/1.png',
          import.meta.url
        ).href
      },
      {
        id: 11,
        productName: 'Sweatshirt',
        thumbImage: new URL(
          '@/assets/img/products/sweatshirt-plug/1.png',
          import.meta.url
        ).href
      }
    ]
  }
]

export const PRODUCTS_DATA: IProduct[] = [
  {
    id: 0,
    productName: 'Zip hoodie',
    description:
      'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
    cost: 125,
    dropId: 0,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      new URL('@/assets/img/products/zip-hoodie-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/4.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/5.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 1,
    productName: 'Sweatshirt',
    description:
      'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
    cost: 80,
    dropId: 0,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      new URL('@/assets/img/products/sweatshirt-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/4.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: true },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 2,
    productName: 'Zip hoodie',
    description:
      'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
    cost: 125,
    dropId: 0,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      new URL('@/assets/img/products/zip-hoodie-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/4.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/5.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 3,
    productName: 'Sweatshirt',
    description:
      'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
    cost: 80,
    dropId: 0,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      new URL('@/assets/img/products/sweatshirt-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/4.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: true },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 4,
    productName: 'Zip hoodie',
    description:
      'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
    cost: 125,
    dropId: 1,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      new URL('@/assets/img/products/zip-hoodie-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/4.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/5.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 5,
    productName: 'Sweatshirt',
    description:
      'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
    cost: 80,
    dropId: 1,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      new URL('@/assets/img/products/sweatshirt-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/4.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: true },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 6,
    productName: 'Zip hoodie',
    description:
      'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
    cost: 125,
    dropId: 1,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      new URL('@/assets/img/products/zip-hoodie-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/4.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/5.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 7,
    productName: 'Sweatshirt',
    description:
      'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
    cost: 80,
    dropId: 1,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      new URL('@/assets/img/products/sweatshirt-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/4.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: true },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 8,
    productName: 'Zip hoodie',
    description:
      'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
    cost: 125,
    dropId: 1,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      new URL('@/assets/img/products/zip-hoodie-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/4.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/5.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 9,
    productName: 'Sweatshirt',
    description:
      'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
    cost: 80,
    dropId: 1,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      new URL('@/assets/img/products/sweatshirt-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/4.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: true },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 10,
    productName: 'Zip hoodie',
    description:
      'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
    cost: 125,
    dropId: 2,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      new URL('@/assets/img/products/zip-hoodie-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/4.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/zip-hoodie-plug/5.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  },
  {
    id: 11,
    productName: 'Sweatshirt',
    description:
      'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
    cost: 80,
    dropId: 2,
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      new URL('@/assets/img/products/sweatshirt-plug/1.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/2.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/3.png', import.meta.url)
        .href,
      new URL('@/assets/img/products/sweatshirt-plug/4.png', import.meta.url)
        .href
    ],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: true },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  }
]
