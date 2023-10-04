<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { useCatalogStore } from '@/api/modules/catalog'

import CatalogProductSliderCard from './CatalogProductSliderCard.vue'

const route = useRoute()
const catalogStore = useCatalogStore()

const currentCatalog =
  catalogStore.catalog &&
  catalogStore.catalog?.find(
    catalog => catalog.dropSlug === route.params.dropSlug
  )
</script>

<template>
  <div class="grid grid-cols-1 gap-x-24 gap-y-60 lg:grid-cols-3">
    <template v-for="item in currentCatalog?.products || []" :key="item.id">
      <CatalogProductSliderCard
        v-bind="{
          productName: item.productName,
          productId: item.id,
          image: item.thumbImage
        }"
      />
    </template>
  </div>
</template>
