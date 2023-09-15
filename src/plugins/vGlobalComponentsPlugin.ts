import { App } from 'vue'

import AppButton from '@/components/shared/AppButton.vue'
import AppCollapse from '@/components/shared/AppCollapse.vue'
import AppContaier from '@/components/shared/AppContainer.vue'
import AppInput from '@/components/shared/AppInput.vue'

export const vGlobalComponentsPlugin = {
  install(app: App) {
    attachedComponents.forEach(attached => {
      app.component(attached.name, attached.component)
    })
  }
}

const attachedComponents = [
  {
    name: 'AppContainer',
    component: AppContaier
  },
  {
    name: 'AppButton',
    component: AppButton
  },
  {
    name: 'AppInput',
    component: AppInput
  },
  {
    name: 'AppCollapse',
    component: AppCollapse
  }
]
