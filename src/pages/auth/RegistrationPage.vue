<script lang="ts" setup>
import { useHead } from '@unhead/vue'

import { AppSignupForm } from '@/components/screens/app-auth'
import { constructPageTitle } from '@/utils'

useHead({
  title: constructPageTitle('Sign up')
})
</script>

<template>
  <AppContainer>
    <section class="-mx-15 pb-40 pt-30 md:mx-0 md:pt-40">
      <AppSignupForm />
    </section>
  </AppContainer>
</template>
