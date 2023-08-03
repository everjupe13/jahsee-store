<script lang="ts" setup>
import AppListItem from '@/components/shared/AppListItem.vue'

interface IAppList {
  items: { label: string }[]
  bulleted?: boolean
  listClasses?: string
}

const props = withDefaults(defineProps<IAppList>(), {
  items: () => [],
  bulleted: true
})
</script>

<template>
  <ul class="list">
    <AppListItem
      v-for="(item, index) in props.items"
      :key="index"
      :bulleted="props.bulleted"
      class="tw-mb-16"
      :class="listClasses"
    >
      {{ item?.label || '' }}
    </AppListItem>
  </ul>
</template>
