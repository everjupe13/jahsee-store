<script lang="ts" setup>
import { ref } from 'vue'

import { useCatalogStore } from '@/api/modules/catalog'
import {
  AppCatalogProductsSlider,
  AppCatalogVideoBanner
} from '@/components/screens/app-catalog'

const isBannerClosed = ref(false)
const handleCloseBannerClick = () => {
  isBannerClosed.value = true
}

const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()
</script>

<template>
  <section>
    <div v-if="!isBannerClosed" class="mb-50 bg-white pb-12">
      <AppContainer>
        <AppCatalogVideoBanner>
          <template #close>
            <button
              class="p-10 text-[48px] font-black text-button-black"
              @click="handleCloseBannerClick"
            >
              X
            </button>
          </template>
        </AppCatalogVideoBanner>
      </AppContainer>
    </div>
    <AppContainer>
      <div class="mt-60">
        <AppCatalogProductsSlider />
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped></style>
