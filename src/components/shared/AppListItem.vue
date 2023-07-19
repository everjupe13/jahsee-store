<script lang="ts" setup>

const props = defineProps({
  bulleted: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <li :class="['list-item', { 'list-item_bulleted': props.bulleted }]">
    <slot></slot>
  </li>
</template>

<style lang="scss" scoped>
.list-item {
  &_bulleted {
    position: relative;
    padding-left: 24px;

    &::before {
      content: '';

      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      display: block;

      width: 10px;
      height: 10px;
      border-radius: 100%;

      background-color: var(--color-green);
    }
  }
}
</style>

