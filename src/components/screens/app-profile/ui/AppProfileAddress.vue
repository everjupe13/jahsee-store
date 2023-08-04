<script lang="ts" setup></script>

<template>
  <div>
    <h2 class="heading mb-40 font-hnd text-button-black">My addresses</h2>
    <AppButton outlined class="mb-20 px-48 py-24">Add new adress</AppButton>
    <div class="flex flex-col gap-y-20">
      <div class="border border-solid border-button-black/10 p-20 md:p-30">
        <div class="flex justify-between">
          <div class="flex flex-col gap-y-24">
            <p class="text">Ahmad Dias</p>
            <p class="text">16 Willow St.Brooklyn, NY 11218</p>
            <p class="text">New york, 11218 usa</p>
          </div>
          <div class="flex flex-shrink-0 flex-col md:flex-row">
            <button class="button-text p-10">Delete</button>
            <button class="button-text p-10">Edit</button>
          </div>
        </div>
      </div>
      <div class="border border-solid border-button-black/10 p-20 md:p-30">
        <div class="flex justify-between">
          <div class="flex flex-col gap-y-24">
            <p class="text">Ahmad Dias</p>
            <p class="text">16 Willow St.Brooklyn, NY 11218</p>
            <p class="text">New york, 11218 usa</p>
          </div>
          <div class="flex flex-shrink-0 flex-col md:flex-row">
            <button class="button-text p-10">Delete</button>
            <button class="button-text p-10">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';

.text {
  @apply text-[16px] font-semibold leading-none text-[#555862];
}

.button-text {
  @apply font-hnd text-[14px] font-bold uppercase leading-none text-button-black;
}
</style>
