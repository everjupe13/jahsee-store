<script lang="ts" setup>
import { ref } from 'vue'

import { AppCatalogVideoBanner } from '@/components/screens/app-catalog'

const isBannerClosed = ref(false)
const handleCloseBannerClick = () => {
  isBannerClosed.value = true
}
</script>

<template>
  <section>
    <div v-if="!isBannerClosed" class="bg-white pb-12">
      <AppContainer>
        <AppCatalogVideoBanner>
          <template #close>
            <button
              class="p-10 text-[48px] font-black text-button-black"
              @click="handleCloseBannerClick"
            >
              X
            </button>
          </template>
        </AppCatalogVideoBanner>
      </AppContainer>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
