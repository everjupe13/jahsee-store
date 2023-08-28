import 'aos/dist/aos.css'
import 'vue-final-modal/style.css'
import '@/assets/scss/index.scss'
import '@/assets/scss/tailwind.scss'
import '@/assets/scss/fonts.scss'
import '@/assets/scss/custom-scrollbar.scss'

import AOS from 'aos'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

import App from '@/App.vue'
import { vGlobalComponentsPlugin } from '@/plugins/vGlobalComponentsPlugin'
import { Preloader } from '@/utils/preloader'

import { router } from './router'

const bootstrap = async () => {
  const app = createApp(App)
  const pinia = createPinia()
  const vfm = createVfm()

  app.use(pinia)
  app.use(router)
  app.use(vfm)
  app.use(vGlobalComponentsPlugin)

  app.mount('#app')

  await Preloader.invoke(() => {
    AOS.init({
      once: true,
      duration: 400
    })
  })
}

bootstrap()
