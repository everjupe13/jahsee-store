<script lang="ts" setup>
import { useCatalogStore } from '@/api/modules/catalog'
import { HomeSlider } from '@/components/screens/app-home'

const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <div class="m-auto w-full max-w-[800px]">
        <HomeSlider />
      </div>
    </AppContainer>
  </section>
</template>
