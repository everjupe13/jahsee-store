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
    <div class="logo">
      <router-link
        :to="props.toLink"
        class="logo__link tw-flex tw-items-center"
      >
        <img
          src="@/assets/img/logo.svg"
          alt=""
          class="logo__link-image tw-pointer-events-none tw-max-h-40"
        />
      </router-link>
    </div>
  </div>
</template>
