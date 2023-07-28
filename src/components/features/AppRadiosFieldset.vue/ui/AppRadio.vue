<script lang="ts" setup>
import AppBaseRadio from '@/components/shared/AppBaseRadio.vue'

import { inject } from 'vue'

const props = defineProps(['modelValue', 'value'])
const emit = defineEmits(['update:modelValue', 'input'])

const fieldsetContext = inject('context') as { update: (e: InputEvent) => void }

const handleModelValueChange = (e: InputEvent) => {
  emit('input', e)
  fieldsetContext.update(e)
}
</script>

<template>
  <AppBaseRadio :model-value="props.value" @update:model-value="(e) => handleModelValueChange(e)">
    <slot></slot>
  </AppBaseRadio>
</template>