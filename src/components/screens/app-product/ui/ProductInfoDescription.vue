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
    class="text-[16px] font-medium leading-normal text-[rgba(255,255,255,0.6)]"
    v-html="props.text"
  ></div>
</template>
