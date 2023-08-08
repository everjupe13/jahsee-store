<script lang="ts" setup>
import { useCatalogStore } from '@/api/modules/catalog'
import { AppHomeSlider } from '@/components/screens/app-home'

const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()
</script>

<template>
  <section class="pt-60">
    <AppContainer>
      <div class="m-auto w-full max-w-[800px]">
        <AppHomeSlider />
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.links {
  padding-bottom: 180px;
}
</style>
