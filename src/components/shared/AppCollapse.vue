<script lang="ts" setup>
import { ref, onMounted, watch, reactive, Ref, } from 'vue'

interface Props {
  modelValue?: boolean
}

const props = defineProps<Props>()
// const emits = defineEmits(['update:modelValue'])
const contentRef = ref<HTMLElement>()
const contentHeight: Ref<number | undefined | null> = ref(null)
const componentClasses = reactive({ collapse: true, show: true })

const changeState = (state: boolean) => {
  if (contentRef.value) {
    if (state) {
     contentRef.value.style.setProperty('--content-height', `${contentHeight.value}px`)
    } else {
      contentRef.value.style.setProperty('--content-height', `0px`)
    }
  }
}

const collapseState = ref(false)

const useChangeState = () => {
  if (!props.modelValue) {
    changeState(collapseState.value)
    return
  }

  changeState(props.modelValue)
  return
}

onMounted(() => {
  contentHeight.value = contentRef.value?.getBoundingClientRect().height
  useChangeState()
})

watch(() => props.modelValue, () => {
  changeState(props.modelValue)
})

watch(() => collapseState.value, () => {
  changeState(collapseState.value)
})

const handleClick = () => {
  if (!props.modelValue) {
    collapseState.value = !collapseState.value
  }
}
</script>

<template>
  <div ref="contentRef" :class="componentClasses" @click="handleClick">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.collapse {
  height: var(--content-height);
  transition: height .35s ease;
  overflow: hidden;

  --content-height: auto
}
</style>