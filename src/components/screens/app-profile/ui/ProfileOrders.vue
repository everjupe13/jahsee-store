<script lang="ts" setup>
import { computed } from 'vue'

import { useUserStore } from '@/api/modules/user'

import ProfileOrderCard from './ProfileOrderCard.vue'
import ProfileTabHeading from './ProfileTabHeading.vue'

const userStore = useUserStore()
const { data } = await userStore.getOrders()
const orders = computed(() => data || null)
</script>

<template>
  <div>
    <ProfileTabHeading>Orders</ProfileTabHeading>
    <template v-if="orders && orders.length > 0">
      <div
        class="grid grid-cols-1 items-center border-0 border-b-[1px] border-b-[rgba(0,0,0,0.1)] pb-15 md:grid-cols-[calc(100%/12*8)_calc(100%/12*2)_calc(100%/12*2)] md:pb-20"
      >
        <div class="uppercase leading-none text-[#848a99] text-medium-14">
          Product
        </div>
        <div
          class="hidden uppercase leading-none text-[#848a99] text-medium-14 md:block"
        >
          Status
        </div>
        <div
          class="hidden uppercase leading-none text-[#848a99] text-medium-14 md:block"
        >
          Track
        </div>
      </div>

      <div>
        <ProfileOrderCard
          v-for="order in orders"
          :key="order.id"
          v-bind="order"
        />
      </div>
    </template>
    <template v-else>
      <p class="empty-text font-hnd">
        You haven't ordered yet.
        <br />
        To place an order, please go
        <router-link to="/">to the main page</router-link>
      </p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.empty-text {
  @apply text-[14px] font-extrabold uppercase text-[#848a99];

  a {
    @apply text-button-black underline underline-offset-2 transition-all hover:underline-offset-[6px] focus:underline-offset-[6px] active:underline-offset-[6px];
  }
}
</style>
