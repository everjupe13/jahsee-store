<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue'
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/api/modules/auth/auth.store'
import { useUserStore } from '@/api/modules/user'
import { FormAlternativeLoader } from '@/components/widgets/loaders'
import { RouteNamesEnum } from '@/router/router.types'
import { sleep } from '@/utils'
import { emailValidator } from '@/utils/validators'
// const emit = defineEmits(['submit'])

const formData = reactive({
  email: '',
  password: ''
})

const rules = {
  email: {
    required,
    email,
    customEmailLenghtValidator: helpers.withMessage(
      emailValidator.validationMessage,
      emailValidator.lengthValdator
    )
  },
  password: { required, minLengthValue: minLength(8) }
}

const v$ = useVuelidate(rules, formData)

const serverMessage = ref<string | null>(null)
const serverMessageVisible = computed(
  () => serverMessage.value && serverMessage.value !== null
)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()
watch(formData, () => {
  serverMessage.value = null
})

async function _tryToRedirectFromQuery({
  elsePath
}: {
  elsePath?: RouteLocationRaw
}) {
  try {
    if (
      route.query.redirect &&
      Object.values(RouteNamesEnum).includes(
        route.query.redirect.slice(
          1
        ) as (typeof RouteNamesEnum)[keyof typeof RouteNamesEnum]
      )
    ) {
      await router.push(route.query.redirect.slice(1) as string)
      return
    } else {
      await router.push(elsePath || { name: RouteNamesEnum.home })
    }
  } catch {
    /* empty */
  }
}

const loading = ref(false)
const longLoading = ref(false)

const beforeRequestLoaders = async () => {
  longLoading.value = true
  loading.value = true
}

const afterRequestLoaders = async () => {
  await sleep(200)
  loading.value = false
  await sleep(700)
  longLoading.value = false
}

const checkClientValidation = () => {
  if (v$.value.$invalid) {
    v$.value.$validate()
    return false
  }

  return true
}

const onSubmitForm = async () => {
  await beforeRequestLoaders()

  const isValid = checkClientValidation()
  if (!isValid) {
    return await afterRequestLoaders()
  }

  const { status, error } = await authStore.signIn({
    email: formData.email,
    password: formData.password
  })

  if (error) {
    const messages = error as { [x: string]: string[] }
    const pureMessage =
      messages instanceof Object ? Object.values(messages).flat(1)[0] : ''
    serverMessage.value = pureMessage

    return await afterRequestLoaders()
  }

  if (status) {
    const isProfileSuccess = await userStore.fetchProfile()
    if (isProfileSuccess) {
      _tryToRedirectFromQuery({ elsePath: { name: RouteNamesEnum.home } })
    }
  }
}
</script>

<template>
  <form
    class="mx-auto max-w-[580px] bg-white p-30 py-30 md:p-60 md:pb-50"
    @submit.prevent="onSubmitForm"
  >
    <h3
      class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      Welcome to ayaysee
    </h3>
    <div class="mb-30 md:mb-40">
      <AppInput
        v-model="v$.email.$model"
        placeholder="e-mail*"
        class="mb-15"
        :disabled="longLoading"
        :is-valid="v$.email.$dirty ? !v$.email.$invalid : true"
        :is-dirty="v$.email.$dirty"
        :validation-message="v$.email.$silentErrors[0]?.$message"
      />
      <AppInput
        v-model="v$.password.$model"
        placeholder="password*"
        type="password"
        :disabled="longLoading"
        :is-valid="v$.password.$dirty ? !v$.password.$invalid : true"
        :is-dirty="v$.password.$dirty"
        :validation-message="v$.password.$silentErrors[0]?.$message"
      />
    </div>
    <div
      v-if="serverMessageVisible"
      class="mb-10 px-5 text-[#d84949] text-medium-15"
    >
      {{ serverMessage }}
    </div>
    <AppButton fluid class="mb-25 h-65" :disabled="longLoading">
      <template v-if="loading">
        <div class="flex items-center justify-center">
          <FormAlternativeLoader></FormAlternativeLoader>
        </div>
      </template>
      <template v-else>Log In</template>
    </AppButton>
    <div class="text-center font-medium leading-none text-[#6a6e7a]">
      Don’t have an account?
      <router-link to="/signup" class="text-button-black">Sign Up</router-link>
    </div>
  </form>
</template>
