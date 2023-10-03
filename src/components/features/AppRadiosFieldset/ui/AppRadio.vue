<script lang="ts" setup>
import { inject } from 'vue'

import AppBaseRadio from '@/components/shared/AppBaseRadio.vue'

const props = defineProps(['modelValue', 'value', 'disabled'])
const emit = defineEmits(['update:modelValue', 'input'])

const fieldsetContext = inject('context') as { update: (e: InputEvent) => void }

const handleModelValueChange = (e: InputEvent) => {
  emit('input', e)
  fieldsetContext.update(e)
}
</script>

<template>
  <AppBaseRadio
    :model-value="props.value"
    :disabled="props.disabled"
    @update:model-value="e => handleModelValueChange(e)"
  >
    <slot></slot>
  </AppBaseRadio>
</template>
