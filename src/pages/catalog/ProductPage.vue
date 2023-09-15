<script lang="ts" setup>
import { computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCartStore } from '@/api/modules/cart'
import { ICatalog, IProduct, useCatalogStore } from '@/api/modules/catalog'
import AppBackNav from '@/components/features/AppBackNav.vue'
import { ProductGallery, ProductInfo } from '@/components/screens/app-product'

const router = useRouter()
const route = useRoute()
const catalogStore = useCatalogStore()

await catalogStore.fetchCatalog()
const currentCatalog: Ref<undefined | ICatalog> = computed(() => {
  return catalogStore.catalog
    ? catalogStore.catalog.find(
        catalog => catalog.dropSlug === route.params.dropSlug
      )
    : undefined
})

await catalogStore.fetchProducts(currentCatalog.value?.id || 0)
const currentDrop: Ref<undefined | IProduct> = computed(() => {
  return catalogStore.products
    ? (catalogStore.products.find(
        product => product.id === Number(route.params.dropId)
      ) as IProduct)
    : undefined
})

if (!currentDrop?.value || !currentCatalog?.value) {
  await router.push('/')
}

const cartStore = useCartStore()
const handleAddProductToCart = (size: string) => {
  cartStore.addItem(currentDrop.value!.id, size)
}
</script>

<template>
  <section class="product-page pb-40 pt-30 md:pt-40">
    <AppContainer>
      <AppBackNav />

      <div
        class="product-page__grid grid gap-x-15 gap-y-50 pt-30 xl:pb-50 xl:pt-30 2xl:pb-85 2xl:pt-40"
      >
        <ProductInfo
          :title="currentDrop!.productName"
          :cost="currentDrop!.cost"
          :description="currentDrop!.description"
          :sizes="currentDrop!.sizes"
          :about-list="currentDrop!.aboutList"
          :sizing-image="currentDrop!.sizingImage"
          @handle-product-add="handleAddProductToCart"
        ></ProductInfo>
        <ProductGallery
          class="row-start-1 row-end-2 lg:row-auto"
          :gallery="currentDrop!.gallery"
        ></ProductGallery>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.product-page {
  &__grid {
    grid-template-columns: calc(100% - var(--wrapper-gallery-ruler) - 15px) var(
        --wrapper-gallery-ruler
      );

    --dimension-ruler: 640px;
    --wrapper-gallery-ruler: calc(
      (var(--dimension-ruler) - 20px * 3) / 4 + var(--dimension-ruler) + 30px
    );

    @include laptop-big {
      --dimension-ruler: 500px;
      --wrapper-gallery-ruler: calc(
        (var(--dimension-ruler) - 20px * 3) / 4 + var(--dimension-ruler) + 15px
      );
    }

    @include laptop {
      --dimension-ruler: 400px;
    }

    @include tablet {
      grid-template-columns: 100%;
    }
  }
}
</style>
