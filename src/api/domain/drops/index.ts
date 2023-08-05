export const DROPS_DATA: IDrop[] = [
  {
    id: 0,
    dropSlug: 'first-drop',
    video: new URL('@/assets/media/catalog-video-plug.mp4', import.meta.url)
      .href,
    videoPoster: new URL(
      '@/assets/media/catalog-video-plug-poster.png',
      import.meta.url
    ).href,
    products: [
      {
        id: 0,
        image: ''
      }
    ]
  },
  {
    id: 1,
    dropSlug: 'second-drop',
    video: new URL('@/assets/media/catalog-video-plug.mp4', import.meta.url)
      .href,
    videoPoster: new URL(
      '@/assets/media/catalog-video-plug-poster.png',
      import.meta.url
    ).href,
    products: [
      {
        id: 0,
        image: ''
      }
    ]
  },
  {
    id: 2,
    dropSlug: 'third-drop',
    video: new URL('@/assets/media/catalog-video-plug.mp4', import.meta.url)
      .href,
    videoPoster: new URL(
      '@/assets/media/catalog-video-plug-poster.png',
      import.meta.url
    ).href,
    products: [
      {
        id: 0,
        image: ''
      }
    ]
  }
]

export interface IDrop {
  id: number
  dropSlug: string
  video: string
  videoPoster: string
  products: IProduct[]
}

export interface IProduct {
  id: number
  image: string
}
