<script lang="ts" setup>
import { useHead } from '@unhead/vue'

import { NotFoundError } from '@/components/screens/app-error'
import { constructPageTitle } from '@/utils'

useHead({
  title: constructPageTitle('Error')
})
</script>

<template>
  <Head></Head>
  <section class="min-h-full pb-40 pt-30 md:pt-40">
    <AppContainer>
      <NotFoundError />
    </AppContainer>
  </section>
</template>
