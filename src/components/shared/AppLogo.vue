<script setup lang="ts">
import { RouterLinkProps } from 'vue-router';

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
      <router-link :to="props.toLink" class="tw-flex tw-items-center logo__link">
        <img src="@/assets/img/logo.png" alt="" class="logo__link-image tw-pointer-events-none tw-max-h-40">
      </router-link>
    </div>
  </div>
</template>
