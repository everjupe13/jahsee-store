export interface ICatalog {
  id: number
  dropSlug: (typeof CatalogSlugsEnum)[keyof typeof CatalogSlugsEnum]
  name: string
  thumbImage: string
  yearTag: string
  video: string
  videoPoster: string
  status: 'active' | 'sold out'
  productsIds: { id: IProduct['id'] }[]
  products?: IProduct[]
}

export interface IProduct {
  id: number
  productName: string
  description: string
  dropId: ICatalog['id']
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
