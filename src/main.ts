import { createApp } from 'vue'
import { router } from './router'

import './normalize.css'

import 'swiper/css'
import 'aos/dist/aos.css'
import './assets/scss/main.scss'
import AOS from 'aos'

import App from '@/App.vue'
import { vGlobalComponentsPlugin } from '@/components/global/vGlobalComponentsPlugin'


const app = createApp(App)
app.use(router)
app.use(vGlobalComponentsPlugin)


// window.$router = router
AOS.init({
  once: true,
  duration: 400
})

app.mount('#app')

const fadeOut = (element: HTMLElement | null) => {
  if (!element) {
    return 
  }

  let op = 1
  let timer = setInterval(function () {
      if (op <= 0.1) {
          clearInterval(timer)
          element.style.display = 'none'
      }

      element.style.opacity = String(op)
      element.style.filter = 'alpha(opacity=' + op * 100 + ")"
      op -= op * 0.1
  }, 10)
}

window.addEventListener('load', () => {
  fadeOut(document.querySelector('#loader'))
  document.body.classList.remove('body-loading')
})
