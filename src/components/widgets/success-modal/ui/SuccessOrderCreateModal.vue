<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const handleSubmitClick = () => {
  emit('confirm')
}
</script>

<template>
  <div>
    <h3
      class="mb-20 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      Thank you for your purchase
    </h3>
    <p class="mb-20 text-center font-hnd text-[22px] text-button-black">
      You can track your order status in your profile
    </p>
    <AppButton outlined fluid class="px-48 py-24" @click="handleSubmitClick">
      Confirm
    </AppButton>
  </div>
</template>
