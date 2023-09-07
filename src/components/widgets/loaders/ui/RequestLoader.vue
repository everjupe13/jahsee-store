<script lang="ts" setup></script>

<template>
  <Teleport to="#app">
    <div
      v-if="false"
      class="fixed bottom-15 right-15 flex h-50 w-50 items-center justify-center text-[14px]"
    >
      <span class="loader-icon"></span>
    </div>
  </Teleport>
</template>

<style scoped>
.loader-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 6em;
  margin-top: 3em;
  margin-bottom: 3em;
}
.loader-icon:before,
.loader-icon:after {
  content: '';
  position: absolute;
  border-radius: 50%;
  animation: pulsOut 1.8s ease-in-out infinite;
  filter: drop-shadow(0 0 1em rgba(255, 255, 255, 0.75));
}
.loader-icon:before {
  width: 100%;
  padding-bottom: 100%;
  box-shadow: inset 0 0 0 1em #fff;
  animation-name: pulsIn;
}
.loader-icon:after {
  width: calc(100% - 2em);
  padding-bottom: calc(100% - 2em);
  box-shadow: 0 0 0 0 #fff;
}

@keyframes pulsIn {
  0% {
    box-shadow: inset 0 0 0 1em #fff;
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
    box-shadow: 0 0 0 1em #fff;
    opacity: 1;
  }
}
</style>
