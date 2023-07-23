<script setup lang="ts">
import { computed } from 'vue'

interface IAppButton {
  theme?: 'default' | 'alternative' | 'black',
  size?: 'sm' | 'md',
  rounded?: boolean,
  outlined?: boolean
}

const props = withDefaults(defineProps<IAppButton>(), {
  theme: 'default'
})

const componentsClasses = computed(() => {
  const _size = { 'btn_small': props.size === 'sm', 'btn_medium': props.size === 'md' }

  return [
    props.theme ? `btn_theme-${props.theme}` : '',
    _size,
    { 'btn_outlined': props.outlined }
  ]
})

</script>

<template>
  <button class="btn" :class="componentsClasses">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  justify-content: center;
  align-items: center;
  
  padding: 26px 70px;

  background: #202022;

  color: #F6F5FF;
  text-align: center;

  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;

  transition: .2s all ease;

  @apply tw-flex tw-items-center;

  @media (max-width: 767px) {
    padding: 18px 30px;
  }

  &_theme-alternative {
    @apply tw-bg-[#D9D9D9] tw-text-[#202022]
  }
}
</style>