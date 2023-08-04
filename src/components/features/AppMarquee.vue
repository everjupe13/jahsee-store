<script lang="ts" setup>
import { useSlots } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'

const slots = useSlots()

const contentText = slots.default?.()

const rootNode = document.createElement('div')
rootNode.innerHTML = contentText?.[0].children as string

const nodes: string[] = Array.from({ length: 10 }).map(
  _node => contentText?.[0].children as string
)
</script>

<template>
  <div class="marquee-wrapper">
    <Vue3Marquee :duration="30">
      <div v-for="(node, index) in nodes" class="marquee__item" :key="index">
        <div class="marquee__label">
          {{ node }}
        </div>
        <div class="marquee__divider">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 5H13V10.2679L17.5619 7.63416L18.5619 9.36621L13.9997 12.0002L18.5619 14.6342L17.5619 16.3662L13 13.7324V19H11V13.732L6.4375 16.3662L5.4375 14.6342L9.99968 12.0002L5.4375 9.36621L6.4375 7.63416L11 10.2683V5Z"
              fill="#202022"
            />
          </svg>
        </div>
      </div>
    </Vue3Marquee>
  </div>
</template>

<style lang="scss" scoped>
.marquee-wrapper {
  padding: 10px 0;

  background-color: #fff;
  overflow-x: hidden;
}
.marquee {
  &__item {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    column-gap: 14px;

    margin-right: 14px;
  }

  &__label {
    flex: 0 0 auto;
    color: #202022;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
  }
}
</style>
