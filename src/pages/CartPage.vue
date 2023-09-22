<script lang="ts" setup>
import { useHead } from '@unhead/vue'

import { CartConfig } from '@/components/screens/app-cart'
import { constructPageTitle } from '@/utils'

useHead({
  title: constructPageTitle('Cart')
})
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <CartConfig></CartConfig>
    </AppContainer>
  </section>
</template>
