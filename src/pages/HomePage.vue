<script lang="ts" setup>
import { AppHomeSlider } from '@/components/screens/app-home'

// const tourCardsData = [
//   {
//     cover: new URL('@/assets/img/cards/card-1.png', import.meta.url).href,
//     title: 'Тур к каменной реке',
//     list: [
//       { label: '16 000$ / чел', icon: 'franklin' },
//       { label: '3 дня', icon: 'time' }
//     ],
//     toLink: { name: 'tour' }
//   },
// ]
</script>

<template>
  <section class="tw-pt-60">
    <AppContainer>
      <div class="tw-m-auto tw-max-w-[800px]">
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
