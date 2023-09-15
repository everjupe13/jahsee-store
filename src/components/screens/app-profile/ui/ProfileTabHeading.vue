<script lang="ts" setup></script>

<template>
  <h2 class="heading mb-20 font-hnd text-button-black xl:mb-40">
    <slot></slot>
  </h2>
</template>

<style lang="scss" scoped>
.heading {
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 0.72px;
  text-transform: uppercase;
}
</style>
