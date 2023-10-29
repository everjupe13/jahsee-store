<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { computed, ref } from 'vue'

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

const filterValue = ref('')
const searchedAdresses = computed(() =>
  filterValue.value
    ? props.addresses.filter(address =>
        address.address.toUpperCase().includes(filterValue.value.toUpperCase())
      )
    : props.addresses
)
</script>

<template>
  <form
    @submit.prevent="onSubmitForm"
    class="flex h-full max-h-[80vh] min-h-[670px] flex-col flex-col"
  >
    <h3
      class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      delivery pickpoint
    </h3>
    <AppInput v-model="filterValue" class="mb-20" placeholder="Search" />
    <div
      class="max-h-[500px] w-full flex-grow overflow-y-auto py-5 transition-all"
    >
      <template v-if="props.addresses.length > 0">
        <TransitionGroup name="list-complete">
          <div
            v-for="address in searchedAdresses"
            :key="address.code"
            class="mb-20 text-[16px] font-semibold leading-none text-black transition-all"
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
        </TransitionGroup>
      </template>
      <template v-else>
        <p
          class="text-center text-[12px] font-semibold leading-none text-[#d84949] lg:text-[14px]"
        >
          {{
            props.errorMessage ||
            "We can't find the pickup address. Check if the address in your profile is correct. If the error is repeated, please contact support."
          }}
        </p>
      </template>
    </div>
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

.list-complete-container,
.list-complete-item {
  transition: all 0.8s ease;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-complete-leave-active {
  position: absolute;
  transform: translateY(-10px);
  width: 100%;
}
</style>
