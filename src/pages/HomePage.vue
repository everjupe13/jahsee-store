<script lang="ts" setup>
import { useHead } from '@unhead/vue'

import { useCatalogStore } from '@/api/modules/catalog'
import { HomeConfig } from '@/components/screens/app-home'
import { constructPageTitle } from '@/utils'

useHead({
  title: constructPageTitle('Home')
})

const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <HomeConfig></HomeConfig>
    </AppContainer>
  </section>
</template>
