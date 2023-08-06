export interface IDrop {
  id: number
  dropSlug: (typeof DropSlugsEnum)[keyof typeof DropSlugsEnum]
  name: string
  thumbImage: string
  yearTag: string
  video: string
  videoPoster: string
  status: 'active' | 'sold out'
  products: IProduct[]
}

export interface IProduct {
  id: number
  productName: string
  description: string
  cost: string
  aboutList: string[]
  gallery: string[]
  sizes: { label: string; soldOut: boolean }[]
}

export const DropSlugsEnum = {
  first: 'first-drop',
  second: 'second-drop',
  third: 'third-drop'
}
