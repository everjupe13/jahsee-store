<script lang="ts" setup>
import { useHead } from '@unhead/vue'

import { ProfileConfig } from '@/components/screens/app-profile'
import { constructPageTitle } from '@/utils'

useHead({
  title: constructPageTitle('Profile')
})
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <ProfileConfig></ProfileConfig>
    </AppContainer>
  </section>
</template>
