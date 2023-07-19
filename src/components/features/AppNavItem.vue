<script lang="ts" setup>
import AppListItem from '@/components/shared/AppListItem.vue'
import { RouterLinkProps } from 'vue-router'

interface IAppNavItem {
  toLink?: RouterLinkProps['to']
}
const props = defineProps<IAppNavItem>()

</script>

<template>
  <AppListItem :bulleted="false" class="nav-list-item">
    <component
      :is="props.toLink ? 'router-link' : 'a'"
      v-bind="{
        ...(props.toLink ? { to: props.toLink } : { href: '' })
      }"
      class="nav-list-item__link"
    >
      <slot></slot>
    </component>
  </AppListItem>
</template>

<style lang="scss" scoped>
.nav-list-item {
  transition: .2s all ease;
  &__link {
    transition: .2s all ease;
  }
}
</style>

