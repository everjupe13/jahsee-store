import { createApp } from 'vue'
import { router } from './router'

import './normalize.css'

import 'swiper/css'
import './assets/scss/main.scss'

import App from '@/App.vue'
import { vGlobalComponentsPlugin } from '@/components/global/vGlobalComponentsPlugin'


const app = createApp(App)
app.use(router)
app.use(vGlobalComponentsPlugin)


// window.$router = router

app.mount('#app')
