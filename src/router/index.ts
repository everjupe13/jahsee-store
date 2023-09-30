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
    component: () => import('@/pages/auth/AuthenticatonPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/signup',
    name: RouteNamesEnum.signup,
    component: () => import('@/pages/auth/RegistrationPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/forget/request-password',
    name: RouteNamesEnum['request-password'],
    component: () => import('@/pages/auth/RequestPasswordChangePage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
  },
  {
    path: '/forget/reset-password',
    name: RouteNamesEnum['reset-password'],
    component: () => import('@/pages/auth/ResetPasswordPage.vue'),
    meta: {
      footerVisible: false,
      layout: AppLayoutsEnum.login,
      requiresUnauth: true
    }
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
      requiresAuth: true
    }
  },
  {
    path: '/catalog/:dropSlug',
    name: RouteNamesEnum.catalog,
    component: () => import('@/pages/catalog/CatalogPage.vue')
  },
  {
    path: '/catalog/:dropSlug/drop/:dropId',
    name: RouteNamesEnum.drop,
    component: () => import('@/pages/catalog/ProductPage.vue')
  },
  {
    path: '/lore/:dropSlug',
    name: RouteNamesEnum.lore,
    component: () => import('@/pages/catalog/ProductLorePage.vue')
  },
  {
    path: '/delivery-info',
    name: RouteNamesEnum.deliveryInfo,
    component: () => import('@/pages/DeliveryInfoPage.vue')
  },
  {
    path: '/privacy',
    name: RouteNamesEnum.privacyInfo,
    component: () => import('@/pages/PrivacyInfoPage.vue')
  },
  {
    path: '/confident',
    name: RouteNamesEnum.confidentInfo,
    component: () => import('@/pages/ConfidentInfoPage.vue')
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
router.beforeResolve(authMiddleware)
router.beforeResolve(stylesWatcherMiddleware)

export { router }
