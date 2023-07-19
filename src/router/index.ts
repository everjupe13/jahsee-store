import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/SignupPage.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/pages/CartPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/ErrorPage.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(_to, _from, _savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, _) => {
  const _app = document.querySelector('#app') as HTMLElement
  const _header = document.querySelector('#header') as HTMLElement

  if (_app && _header)
    _app.style.paddingTop = `${_header?.getBoundingClientRect().height || 0}px`

  if (to.name !== 'home') {
    document.querySelector('.header')?.classList.add('header_full')
    // document.body.style.background = '#F5F7F9'
  } else {
    document.querySelector('.header')?.classList.remove('header_full')
    // document.body.style.background = '#fff'
  }
})


export { router }
