import { ICatalog, IProduct } from './catalog.types'

export const CATALOG_DATA: ICatalog[] = [
  {
    id: 1,
    dropSlug: '1st-drop',
    name: '1st drop',
    thumbImage: '/mock/1d-cover.png',
    video: undefined,
    videoPoster: undefined,
    isCatalogExpanded: false,
    status: 'active',
    yearTag: 'Q1 2023',
    products: [
      {
        id: 1,
        productName: 'ZIP HOODIE',
        thumbImage: '/mock/1d-1.jpg'
      }
    ]
  },
  {
    id: 2,
    dropSlug: '2nd-drop',
    name: '2nd drop',
    thumbImage: '/mock/2d-cover.png',
    video: undefined,
    videoPoster: undefined,
    isCatalogExpanded: false,
    status: 'active',
    yearTag: 'Q2 2023',
    products: [
      {
        id: 2,
        productName: 'SWEATSHIRT',
        thumbImage: '/mock/2d-1.jpg'
      }
    ]
  },
  {
    id: 3,
    dropSlug: '3rd-drop',
    name: '3rd drop',
    thumbImage: '/mock/3d-cover.png',
    video: undefined,
    videoPoster: undefined,
    isCatalogExpanded: true,
    status: 'active',
    yearTag: 'Q4 2023',
    products: [
      {
        id: 6,
        productName: 'AYAYSEE BAG',
        thumbImage: '/mock/3d-1.png'
      },
      {
        id: 5,
        productName: 'BLUR MEMORIES',
        thumbImage: '/mock/3d-2.png'
      },
      {
        id: 4,
        productName: 'ETH DOMINATION',
        thumbImage: '/mock/3d-3.png'
      },
      {
        id: 3,
        productName: 'SOLANA FLIPPER',
        thumbImage: '/mock/3d-4.png'
      }
    ]
  }
]

export const PRODUCTS_DATA: IProduct[] = [
  {
    id: 1,
    productName: 'ZIP HOODIE',
    description:
      "<p>Speed. Rapid decisions. Adrenaline. This legendary T-shirt embodies the dynamics of the cryptocurrency ocean. It's made for those who live amidst numbers, charts, and volatility, but for whom it's more than just a business or a hobby. It's a lifestyle, the breath of the Web3 era.\r\n<br>\r\n<br>\r\nThis is pre-order. Item will be delivered in November.\r\n</p>",
    cost: 125,
    dropId: 1,
    dropSlug: 'zip-hoodie',
    sizingImage: '/mock/1d-1-size.jpg',
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Hood - Puff',
      'Back - silkscreen'
    ],
    gallery: [
      '/mock/1d-1.jpg',
      '/mock/1d-1-2.jpeg',
      '/mock/1d-1-3.jpeg',
      '/mock/1d-1-4.jpeg'
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
    id: 2,
    productName: 'SWEATSHIRT',
    description:
      "<p>Speed. Rapid decisions. Adrenaline. This legendary T-shirt embodies the dynamics of the cryptocurrency ocean. It's made for those who live amidst numbers, charts, and volatility, but for whom it's more than just a business or a hobby. It's a lifestyle, the breath of the Web3 era.\r\n<br>\r\n<br>\r\nThis is pre-order. Item will be delivered in November.\r\n</p>",
    cost: 80,
    dropId: 2,
    dropSlug: 'sweatshirt',
    sizingImage: '/mock/2d-1-size.jpg',
    aboutList: [
      'Fabric density - 360gr/m',
      '80% cotton',
      '20% polyester',
      'Chest - embroidery',
      'Branded patch that tells you the bear market is about to end',
      'Tag that allows you to choose your individual nickname printed on it'
    ],
    gallery: [
      '/mock/2d-1.jpg',
      '/mock/2d-1-2.jpg',
      '/mock/2d-1-3.jpeg',
      '/mock/2d-1-4.jpeg'
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
    productName: 'SOLANA FLIPPER',
    description:
      "<p>Speed. Rapid decisions. Adrenaline. This legendary T-shirt embodies the dynamics of the cryptocurrency ocean. It's made for those who live amidst numbers, charts, and volatility, but for whom it's more than just a business or a hobby. It's a lifestyle, the breath of the Web3 era.\r\n<br>\r\n<br>\r\nThis is pre-order. Item will be delivered in November.\r\n</p>",
    cost: 35,
    dropId: 3,
    dropSlug: 'solana-flipper',
    sizingImage: '/mock/3d-4-size.png',
    aboutList: ['Fabric density - 240g/m', '100% cotton', 'Chest - Puff'],
    gallery: [
      '/mock/3d-4.png',
      '/mock/3d-4-2.png',
      '/mock/3d-4-3.png',
      '/mock/3d-4-4.png'
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
    id: 4,
    productName: 'ETH DOMINATION',
    description:
      "<p>T-shirt appears to be forged from the darkness and majesty of Ethereum, the second-largest cryptocurrency by market capitalization. By wearing this t-shirt, you underscore your engagement with cutting-edge technological trends, your active role in shaping the digital asset epoch, and your readiness to boldly embrace the future that's already here.\r\n<br>\r\n<br>\r\nThis is pre-order. Item will be delivered in November.\r\n</p>",
    cost: 35,
    dropId: 3,
    dropSlug: 'eth',
    sizingImage: '/mock/3d-3-size.png',
    aboutList: ['Fabric density - 240g/m', '100% cotton', 'Chest - Puff'],
    gallery: [
      '/mock/3d-3.png',
      '/mock/3d-3-2.png',
      '/mock/3d-3-3.png',
      '/mock/3d-3-4.png'
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
    productName: 'BLUR MEMORIES',
    description:
      "<p>This unique oversized T-shirt is a true reflection of the Web3.0 era and the NFT universe. It's designed to appeal not only to cryptocurrency and digital asset enthusiasts but to anyone keeping track of trends in fashion and technology.\r\n<br>\r\n<br>\r\nThis is pre-order. Item will be delivered in November.\r\n</p>",
    cost: 35,
    dropId: 3,
    dropSlug: 'blur',
    sizingImage: '/mock/3d-2-size.png',
    aboutList: ['Fabric density - 240g/m', '100% cotton', 'Chest - Puff'],
    gallery: [
      '/mock/3d-2.png',
      '/mock/3d-2-2.png',
      '/mock/3d-2-3.png',
      '/mock/3d-2-4.png'
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
    id: 6,
    productName: 'AYAYSEE BAG',
    description:
      "<p>The capacity of this Bag is comparable to a spaceship. From keys, headphones, and lighter to passport, hardware wallet, and credit cards. Everything you need with it will definitely be with you. It's like a black hole where things disappear and appear just when you need them.\r\n<br>\r\n<br>\r\nThis is pre-order. Item will be delivered in November.\r\n</p>",
    cost: 45,
    dropId: 3,
    dropSlug: 'bag',
    sizingImage: '/mock/3d-1-size.png',
    aboutList: [
      '3 compartments for your belongings.',
      'YKK hardware.',
      'Fabric - corduroy.',
      'Maximum strap length: 60 cm.',
      'Minimum strap length: 30 cm.'
    ],
    gallery: ['/mock/3d-1.png', '/mock/3d-1-2.png', '/mock/3d-1-3.png'],
    sizes: [
      { label: 'XS', soldOut: false },
      { label: 'S', soldOut: false },
      { label: 'M', soldOut: false },
      { label: 'L', soldOut: false },
      { label: 'XL', soldOut: true },
      { label: 'XXL', soldOut: false }
    ]
  }
]
