import {
  CatalogResponseDataType,
  ICatalog,
  IProduct,
  ProductsResponseDataType
} from './catalog.types'

export const CatalogApiMapper = {
  toDomain(entity: CatalogResponseDataType[]): ICatalog[] {
    return entity.map(catalog => ({
      id: Number(catalog.id),
      dropSlug: catalog.get_absolute_url,
      name: catalog.name,
      thumbImage: catalog.get_thumbnail,
      yearTag: catalog.year_tag,
      isCatalogExpanded: catalog.expanded_catalog_type,
      video: catalog.video || undefined,
      videoPoster: catalog.video_poster || undefined,
      status: catalog.status as ICatalog['status'],
      products: catalog.products?.map(product => ({
        id: Number(product.id),
        productName: product.name,
        thumbImage: product.get_image
      }))
    }))
  }
}

export const ProductsApiMapper = {
  toDomain(entity: ProductsResponseDataType[]): IProduct[] {
    return entity.map(product => ({
      id: Number(product.id),
      productName: product.name,
      description: product.description,
      dropSlug: product.get_absolute_url?.slice(1),
      cost: Number.parseFloat(product.price),
      aboutList: ['', ''],
      gallery: [''],
      sizes: [
        { label: 'XS', soldOut: false },
        { label: 'S', soldOut: false },
        { label: 'M', soldOut: false },
        { label: 'L', soldOut: false },
        { label: 'XL', soldOut: true },
        { label: 'XXL', soldOut: false }
      ]
    }))
  }
}
