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
  <div class="overflow-x-hidden bg-white py-5 2xl:py-10">
    <Vue3Marquee :duration="30">
      <div
        v-for="(node, index) in nodes"
        class="mr-14 flex flex-shrink-0 flex-grow-0 basis-auto items-center gap-x-14"
        :key="index"
      >
        <div
          class="flex-shrink-0 flex-grow-0 basis-auto uppercase leading-none text-[#202022] text-medium-14 2xl:text-medium-16"
        >
          {{ node }}
        </div>
        <div class="h-18 w-18 md:h-24 md:w-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="h-full w-full"
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
