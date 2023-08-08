<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { IDropInfoProps } from '../types/IDropInfoProps'

const props = defineProps<IDropInfoProps>()

const title = ref<HTMLElement>()
const titleText = ref<string>('')

onMounted(() => {
  const initAnimation = () => {
    if (!title.value) {
      return
    }

    const _heightCss = window
      .getComputedStyle(title.value as Element)
      .getPropertyValue('height')
    title.value.style.height = _heightCss
    titleText.value = title.value.textContent || ''
    title.value.textContent = ''
    title.value.style.opacity = '1'
  }

  const endAnimation = () => {
    if (!title.value) {
      return
    }
    title.value.style.removeProperty('height')
  }

  if (!title.value) {
    return
  }

  initAnimation()

  const typingDelay = 50
  const startDelay = window.history.state.back ? 500 : 1000
  let charIndex = 0

  const typingAnimation = () => {
    if (!title.value) {
      return
    }

    if (charIndex < titleText.value.length) {
      title.value.textContent += titleText.value.charAt(charIndex)
      charIndex += 1

      setTimeout(typingAnimation, typingDelay)
    } else {
      endAnimation()
    }
  }

  setTimeout(typingAnimation, startDelay + 250)
})
</script>

<template>
  <div
    class="outlined-text drop-info__title mb-25 font-hnd"
    style="--stroke-width: 2px; opacity: 1"
    ref="title"
  >
    {{ props.title }}
  </div>
  <div
    class="drop-info__cost mb-25 font-hnd"
    data-aos="fade-down"
    data-aos-delay="100"
  >
    {{ props.cost }}
  </div>
  <div
    class="drop-info__desc"
    data-aos="fade-down"
    data-aos-delay="200"
    v-html="props.desc"
  ></div>
</template>

<style lang="scss" scoped>
.drop-info {
  &__title {
    position: relative;
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;

    @apply uppercase;

    @media (max-width: 767px) {
      font-size: 36px;
      -webkit-text-stroke-width: 1px;
    }
  }

  &__cost {
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 1;
  }

  &__desc {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
