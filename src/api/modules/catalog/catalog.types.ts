export interface ICatalog {
  id: number
  dropSlug: (typeof CatalogSlugsEnum)[keyof typeof CatalogSlugsEnum]
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

export interface IProduct {
  id: number
  productName: string
  description: string
  dropId?: ICatalog['id']
  cost: number
  aboutList: string[]
  gallery: string[]
  sizes: { label: string; soldOut: boolean }[]
}

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

export type ProductsResponseDataType = {
  id: string
  get_absolute_url: string
  name: string
  description: string
  get_thumbnail: string
  price: string
  get_image: string[]
}
