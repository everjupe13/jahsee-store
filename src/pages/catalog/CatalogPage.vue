<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { useCatalogStore } from '@/api/modules/catalog'
import {
  AppCatalogProductsSlider,
  AppCatalogVideoBanner
} from '@/components/screens/app-catalog'
import { constructPageTitle } from '@/utils'

const isBannerClosed = ref(false)
const handleCloseBannerClick = () => {
  isBannerClosed.value = true
}

const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()

const route = useRoute()

const currentCatalog =
  catalogStore.catalog &&
  catalogStore.catalog?.find(
    catalog => catalog.dropSlug === route.params.dropSlug
  )

useHead({
  title: constructPageTitle(currentCatalog?.name)
})
</script>

<template>
  <section>
    <div v-if="!isBannerClosed" class="pb-12 lg:mb-50 lg:mt-40">
      <AppContainer>
        <AppCatalogVideoBanner>
          <template #close>
            <button
              v-if="false"
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
