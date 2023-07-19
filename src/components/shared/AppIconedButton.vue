<script setup lang="ts">
import { computed } from 'vue'

interface IAppButton {
  theme?: 'default' | 'alternative',
  size?: 'sm',
}

const props = withDefaults(defineProps<IAppButton>(), {
  theme: 'default'
})

const componentsClasses = computed(() => {
  const _size = {  'btn_small': props.size === 'sm' }

  return [
    props.theme ? `btn_theme-${props.theme}` : '',
    _size
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

  padding: 20px;
  border-radius: 100%;

  background: #35977D;

  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #FFF;

  &_small {
    padding: 20px 24px;
    font-size: 12px;
  }

  &_theme-default {
    color: #FFF;
    background: #35977D;
  }

  &_theme-alternative {
    color: #35977D;
    background: #FFF;
  }
}
</style>