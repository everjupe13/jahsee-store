import { App } from "vue"
import AppContaier from './AppContainer.vue'
import AppButton from './AppButton.vue'
import AppInput from '../shared/AppInput.vue'

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
