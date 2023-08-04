<script lang="ts" setup></script>

<template>
  <div>
    <h2 class="heading mb-40 font-hnd text-button-black">Orders</h2>
    <p class="empty-text font-hnd">
      You haven't ordered yet.
      <br />
      To place an order, please go
      <router-link to="/">to the main page</router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';

.empty-text {
  @apply text-[14px] font-extrabold uppercase text-[#848a99];

  a {
    @apply text-button-black underline underline-offset-2 transition-all hover:underline-offset-[6px] focus:underline-offset-[6px] active:underline-offset-[6px];
  }
}
</style>
