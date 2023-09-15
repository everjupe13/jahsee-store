<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface IDropInfoProps {
  text: string
}

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
  <h1
    class="outlined-text info-title relative font-hnd !text-[34px] font-bold uppercase leading-none sm:!text-[38px] lg:!text-[40px] xl:!text-[44px]"
    style="--stroke-width: 2px; opacity: 1"
    ref="title"
  >
    {{ props.text }}
  </h1>
</template>

<style lang="scss" scoped>
.info-title {
  @media (max-width: 767px) {
    font-size: 36px;
    -webkit-text-stroke-width: 1px;
  }
}
</style>
