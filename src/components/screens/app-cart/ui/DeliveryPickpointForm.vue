<script lang="ts" setup>
type PickpointAddressType = {
  address: string
  code: string
}

type Props = {
  addresses?: PickpointAddressType[]
  errorMessage: string
  currentAddress?: PickpointAddressType
}

const props = withDefaults(defineProps<Props>(), {
  currentAddress: undefined,
  addresses: () => [],
  errorMessage: ''
})
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'pick-address', key: string): void
}>()

const onSubmitForm = () => {
  emit('confirm')
}

const handleCurrentAddress = (code: string) => {
  if (code !== props.currentAddress?.code) {
    emit('pick-address', code)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmitForm">
    <h3
      class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      delivery pickpoint
    </h3>
    <template v-if="props.addresses.length > 0">
      <div
        v-for="address in props.addresses"
        :key="address.code"
        class="mb-20 text-[16px] font-semibold leading-none text-black"
        @click="handleCurrentAddress(address.code)"
      >
        <div class="flex max-w-max cursor-pointer items-center gap-x-10">
          <span
            :class="[
              'radio-icon',
              { '--active': address.code === props.currentAddress?.code }
            ]"
          ></span>
          <span>
            {{ address.address }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <p
        class="text-center text-[12px] font-semibold leading-none text-[#d84949] lg:text-[14px]"
      >
        {{ props.errorMessage || 'not found' }}
      </p>
    </template>
  </form>
</template>

<style lang="scss" scoped>
.radio-icon {
  -webkit-appearance: none;
  appearance: none;
  transform: translateY(-1px);

  display: grid;
  place-content: center;

  margin: 0;
  width: 20px;
  height: 20px;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;

  font: inherit;

  transition: all 0.3s ease;

  &.--active {
    border: 1.5px solid rgba(0, 0, 0, 1);

    &::before {
      background-color: rgba(0, 0, 0, 1);
      transform: scale(1);
    }
  }

  &::before {
    content: '';

    display: block;

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: rgba(0, 0, 0, 0.2);

    transform: scale(0);
    transition: 0.12s transform ease-in-out;

    transition: all 0.3s ease;
  }

  &:checked::before {
    transform: scale(1);
  }
}
</style>
