import { createRouter, createWebHistory } from 'vue-router'

import { AppLayoutsEnum } from '@/layout/layout.types'
import { RouteNamesEnum } from '@/router/router.types'

import { authMiddleware } from './middleware/auth.middleware'
import { loadLayoutMiddleware } from './middleware/layout.middleware'
import { stylesWatcherMiddleware } from './middleware/stylesWatcher.middleware'

export const routes = [
  {
    path: '/',
    name: RouteNamesEnum.home,
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/login',
    name: RouteNamesEnum.login,
    component: () => import('@/pages/LoginPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/reset-password',
    name: RouteNamesEnum['reset-password'],
    component: () => import('@/pages/ResetPasswordPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/new-password',
    name: RouteNamesEnum['new-password'],
    component: () => import('@/pages/NewPasswordPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/signup',
    name: RouteNamesEnum.signup,
    component: () => import('@/pages/SignupPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/lore/:id',
    name: RouteNamesEnum.lore,
    component: () => import('@/pages/LorePage.vue')
  },
  {
    path: '/profile',
    name: RouteNamesEnum.profile,
    component: () => import('@/pages/ProfilePage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: RouteNamesEnum.cart,
    component: () => import('@/pages/CartPage.vue'),
    meta: {
      // requiresAuth: true
    }
  },
  {
    path: '/catalog/:dropSlug',
    name: RouteNamesEnum.catalog,
    component: () => import('@/pages/CatalogPage.vue')
  },
  {
    path: '/catalog/:dropSlug/drop/:dropId',
    name: RouteNamesEnum.drop,
    component: () => import('@/pages/DropPage.vue')
  },
  // {
  //   path: '/profile/edit',
  //   name: 'edit-profile',
  //   component: () => import('@/pages/EditProfilePage.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    name: RouteNamesEnum['not-found'],
    component: () => import('@/pages/ErrorPage.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(_to, _from, _savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

router.beforeEach(loadLayoutMiddleware)
router.beforeEach(authMiddleware)
router.beforeEach(stylesWatcherMiddleware)

export { router }
