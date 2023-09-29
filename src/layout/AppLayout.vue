<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <!-- eslint-disable-next-line prettier/prettier -->
  <component :is="(route.meta.layoutComponent)">
    <slot></slot>
  </component>
</template>
