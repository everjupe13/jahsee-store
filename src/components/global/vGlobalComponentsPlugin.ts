import { App } from 'vue'

import AppInput from '../shared/AppInput.vue'
import AppButton from './AppButton.vue'
import AppContaier from './AppContainer.vue'

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
  }
]
