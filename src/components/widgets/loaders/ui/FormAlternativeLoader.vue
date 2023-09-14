<script lang="ts" setup>
type Props = {
  size?: number
}
const props = withDefaults(defineProps<Props>(), {
  size: 25
})
</script>

<template>
  <div
    class="flex items-center justify-center text-[14px]"
    :style="{ height: `${props.size}px`, width: `${props.size}px` }"
  >
    <span
      class="loader-icon"
      :style="{ height: `${props.size}px`, width: `${props.size}px` }"
    ></span>
  </div>
</template>

<style scoped>
.loader-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.loader-icon:before,
.loader-icon:after {
  content: '';
  position: absolute;
  border-radius: 50%;
  animation: pulsOut 1.3s ease-in-out infinite;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.75));
}
.loader-icon:before {
  width: 100%;
  padding-bottom: 100%;
  box-shadow: inset 0 0 0 5px #fff;
  animation-name: pulsIn;
}
.loader-icon:after {
  width: calc(100% - 10px);
  padding-bottom: calc(100% - 10px);
  box-shadow: 0 0 0 0 #fff;
}

@keyframes pulsIn {
  0% {
    box-shadow: inset 0 0 0 5px #fff;
    opacity: 1;
  }
  50%,
  100% {
    box-shadow: inset 0 0 0 0 #fff;
    opacity: 0;
  }
}

@keyframes pulsOut {
  0%,
  50% {
    box-shadow: 0 0 0 0 #fff;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 5px #fff;
    opacity: 1;
  }
}
</style>
