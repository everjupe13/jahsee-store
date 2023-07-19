<script lang="ts" setup>
import { RouterLinkProps } from 'vue-router'
import { computed } from 'vue'


interface IAppBreadcrumbLink {
  label: string,
  toLink?: RouterLinkProps['to']
}

interface IAppBreadcrumbsComponent {
  crumbs?: IAppBreadcrumbLink[]
}

const baseBreadcrumb: IAppBreadcrumbLink = {
  label: 'Главная',
  toLink: '/'
}

const props = withDefaults(defineProps<IAppBreadcrumbsComponent>(), {
  crumbs: () => []
})

const breads = computed<IAppBreadcrumbLink[]>(() => {
  return [ baseBreadcrumb, ...props.crumbs ]
})

const isLastCrumb = (index: number) => {
  return index === breads.value.length - 1
}

const determineCrumbsComponent = (index: number) => {
  return !isLastCrumb(index) && breads.value.length !== 1 ? 'router-link' : 'span'
}
</script>

<template>
  <div class="tw-flex">
    <span class="bread-crumbs">
      <span
        v-for="(crumb, index) in breads"
        :key="crumb.label"
        class="bread-crumbs__item"
      >
        <component 
          :is='determineCrumbsComponent(index)'
          :to="!isLastCrumb(index) ? crumb?.toLink : ''"
          :class="['bread-link', { 'bread-link_pured': isLastCrumb(index) }]"
        >
          {{ crumb.label }}
        </component>
        <span v-if="!isLastCrumb(index)" class="bread-link_pured">{{ ' > ' }}</span>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.bread-link {
  color: #808E95;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;

  &_pured {
    color: #0B2630;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
  }
}
</style>