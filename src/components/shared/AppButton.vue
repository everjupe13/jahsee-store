<script setup lang="ts">
import { computed } from 'vue'

interface IAppButton {
  theme?: 'default' | 'alternative' | 'black'
  size?: 'sm' | 'md'
  rounded?: boolean
  outlined?: boolean
  fluid?: boolean
}

const props = withDefaults(defineProps<IAppButton>(), {
  theme: 'default',
  fluid: false
})

const componentsClasses = computed(() => {
  const _size = {
    btn_small: props.size === 'sm',
    btn_medium: props.size === 'md'
  }

  return [
    props.theme ? `btn_theme-${props.theme}` : '',
    _size,
    props.outlined
      ? 'bg-transparent border border-button-black text-button-black hover:text-white active:text-white disabled:text-white hover:bg-button-black-hover active:bg-button-black-active disabled:bg-button-black-disabled'
      : 'bg-button-black text-white hover:bg-button-black-hover active:bg-button-black-active disabled:bg-button-black-disabled',
    { 'w-full': props.fluid }
  ]
})
</script>

<template>
  <button
    class="btn flex items-center justify-center p-32 font-hnd transition"
    :class="componentsClasses"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;

  @media (max-width: 767px) {
    padding: 18px 30px;
  }

  &_theme-alternative {
    @apply bg-[#D9D9D9] text-[#202022];
  }
}
</style>
