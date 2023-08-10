<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import { RouteNamesEnum } from '@/router/router.types'
</script>

<template>
  <section class="min-h-full pt-40 md:pt-80">
    <AppContainer>
      <div class="grid min-h-full place-items-center">
        <p class="text-[18px] font-semibold">404</p>
        <h1 class="mb-20 font-hnd text-[48px] font-bold">Page not found</h1>
        <RouterLink
          :to="{ name: RouteNamesEnum.home }"
          class="text-[22px] underline underline-offset-2 transition-all hover:underline-offset-[6px] active:underline-offset-[6px]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to home
        </RouterLink>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss"></style>
