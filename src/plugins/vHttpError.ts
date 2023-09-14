import { App } from 'vue'

export const vGlobalComponentsPlugin = {
  install(app: App) {
    app.config.globalProperties.$handleHttpError = Error
  }
}
