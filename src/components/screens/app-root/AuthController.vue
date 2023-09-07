<script lang="ts" setup>
import { useUserStore } from '@/api/modules/user'

const userStore = useUserStore()
await userStore.initialize()
</script>

<template>
  <slot></slot>
</template>
