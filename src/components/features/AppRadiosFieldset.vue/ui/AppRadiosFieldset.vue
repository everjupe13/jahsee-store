<script lang="ts" setup>
import { provide } from 'vue'

const emit = defineEmits(['update'])

provide('context', {
  update: (e: InputEvent) => emit('update', e)
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
