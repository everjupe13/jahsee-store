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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 32px;
  
  background: #000;

  color: #FFF;
  font-family: 'Helvetica Now Display';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;

  &:hover, &:focus {
    background: #333;
  }

  &:active {
    background: #5C5C5C;
  }

  &:disabled {
    background: #CCC;
  }

  @media (max-width: 767px) {
    padding: 18px 30px;
  }
}
</style>