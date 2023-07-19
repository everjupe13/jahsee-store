<script lang="ts" setup>
import AppNavItem from '@/components/features/AppNavItem.vue'
import { RouterLinkProps } from 'vue-router'

interface IAppNavList {
  items: { label: string, toLink?: RouterLinkProps['to'] }[]
  listClasses?: string
}

const props = withDefaults(defineProps<IAppNavList>(), {
  items: () => []
})

</script>

<template>
  <ul class="tw-flex tw-items-center tw-gap-x-24 nav-list">
    <AppNavItem
      v-for="(item, index) in props.items"
      :key="index"
      :class="listClasses"
      :toLink="item.toLink"
    >
      {{ item?.label || '' }}
    </AppNavItem>
  </ul>
</template>