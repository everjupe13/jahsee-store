<script lang="ts" setup>
type Props = {
  text: string
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  text: ''
})
</script>

<template>
  <div
    class="text-[14px] font-medium leading-normal text-[rgba(255,255,255,0.6)] sm:text-[16px] lg:text-[14px] 2xl:text-[16px]"
    v-html="props.text"
  ></div>
</template>
