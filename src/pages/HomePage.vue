<script lang="ts" setup>
import { useCatalogStore } from '@/api/modules/catalog'
import { HomeSlider } from '@/components/screens/app-home'

const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <div
        class="mx-auto w-full max-w-[500px] xl:max-w-[630px] 2xl:max-w-[800px]"
      >
        <HomeSlider />
      </div>
    </AppContainer>
  </section>
</template>
