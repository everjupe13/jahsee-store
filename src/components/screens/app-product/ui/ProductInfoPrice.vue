<script lang="ts" setup>
import { computed } from 'vue'

import { formatDollars } from '@/utils/cost'

type Props = {
  price: number
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  price: 0
})

const formattedPrice = computed(() => formatDollars(props.price))
</script>

<template>
  <div class="font-hnd text-[24px] font-extrabold leading-none">
    {{ formattedPrice }}
  </div>
</template>
