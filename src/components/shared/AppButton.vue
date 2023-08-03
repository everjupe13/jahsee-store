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
    { btn_outlined: props.outlined },
    { 'w-full': props.fluid }
  ]
})
</script>

<template>
  <button
    class="btn flex items-center justify-center bg-button-black p-32 text-white transition hover:bg-button-black-hover active:bg-button-black-active disabled:bg-button-black-disabled"
    :class="componentsClasses"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  font-family: 'Helvetica Now Display';
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
