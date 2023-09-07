export const CatalogSlugsEnum = {
  first: 'first-drop',
  second: 'second-drop',
  third: 'third-drop'
}

export type CatalogResponseDataType = {
  id: string
  get_absolute_url: string
  name: string
  get_thumbnail: string
  year_tag: string
  expanded_catalog_type: boolean
  video: null | string
  video_poster: null | string
  status: string
  products: {
    id: string
    name: string
    get_image: string
  }[]
}

export interface ICatalog {
  id: number
  // dropSlug: (typeof CatalogSlugsEnum)[keyof typeof CatalogSlugsEnum]
  dropSlug: string
  name: string
  thumbImage: string
  yearTag: string
  video?: string
  videoPoster?: string
  isCatalogExpanded: boolean
  status: 'active' | 'sold out'
  products: {
    id: number
    productName: string
    thumbImage: string
  }[]
}

export type ProductsResponseDataType = {
  id: string
  product_name: string
  get_absolute_url: string
  description: string
  price: string
  aboutList: string[]
  images: { id: number; get_images: string }[]
  sizes: { label: string; soldOut: boolean }[]
}

export interface IProduct {
  id: number
  productName: string
  description: string
  dropId?: number | string
  dropSlug?: string
  cost: number
  aboutList: string[]
  gallery: string[]
  sizes: { label: string; soldOut: boolean }[]
}
