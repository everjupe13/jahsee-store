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
      productName: product.product_name,
      description: product.description,
      sizingImage: product.get_size_grid,
      dropSlug: product.get_absolute_url,
      cost: Number.parseFloat(product.price),
      aboutList: product.aboutList,
      gallery: product.images?.map(imageObject => imageObject.get_images) || [],
      sizes: product.sizes
    }))
  },
  toPrimitiveDomain(entity: ProductsResponseDataType): IProduct {
    return {
      id: Number(entity.id),
      productName: entity.product_name,
      description: entity.description,
      sizingImage: entity.get_size_grid,
      dropSlug: entity.get_absolute_url,
      cost: Number.parseFloat(entity.price),
      aboutList: entity.aboutList,
      gallery: entity.images?.map(imageObject => imageObject.get_images) || [],
      sizes: entity.sizes
    }
  }
}
