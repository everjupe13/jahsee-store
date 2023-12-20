import 'aos/dist/aos.css'
import 'vue-final-modal/style.css'
import '@/assets/scss/index.scss'
import '@/assets/scss/tailwind.scss'
import '@/assets/scss/fonts.scss'
import '@/assets/scss/custom-scrollbar.scss'

import { createHead } from '@unhead/vue'
import AOS from 'aos'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

import App from '@/App.vue'
import { vGlobalComponentsPlugin } from '@/plugins/vGlobalComponentsPlugin'
import { Preloader } from '@/utils/preloader'

import { router } from './router'
import { getRandomInt } from './utils'

const bootstrap = async () => {
  const lsVersion = sessionStorage.getItem('ab_version')
  if (!lsVersion) {
    const version = getRandomInt(1, 4)
    sessionStorage.setItem('ab_version', String(version))
  }

  const app = createApp(App)

  const pinia = createPinia()
  const vfm = createVfm()
  const head = createHead()

  app.use(pinia)
  app.use(router)
  app.use(vfm)
  app.use(head)

  app.use(vGlobalComponentsPlugin)

  app.mount('#app')

  const YMoptions = {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  }
  if (import.meta.env.PROD) {
    // eslint-disable-next-line unicorn/numeric-separators-style
    window.ym(95590253, 'init', YMoptions)
  }

  setTimeout(() => {
    window.ym(95_590_253, 'reachGoal', `v${lsVersion}`)
    console.log('target version is sent -' + ' ', lsVersion)
  }, 500)

  await Preloader.invoke(() => {
    AOS.init({
      once: true,
      duration: 400
    })
  })
}

bootstrap()
