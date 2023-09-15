<script setup lang="ts">
import { RouterLinkProps } from 'vue-router'

interface IAppLogo {
  toLink?: RouterLinkProps['to']
}

const props = withDefaults(defineProps<IAppLogo>(), {
  toLink: '/'
})
</script>

<template>
  <div class="logo-box">
    <div class="flex items-center">
      <router-link :to="props.toLink" class="flex items-center">
        <img
          src="@/assets/img/logo.svg"
          alt=""
          class="pointer-events-none w-30 lg:w-40 2xl:w-56"
        />
      </router-link>
    </div>
  </div>
</template>
