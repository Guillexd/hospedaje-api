import { createRouter, createWebHistory } from 'vue-router'
import Navigation from '@/navigation/Navigation.vue'
import DashboardView from '@/dashboard/views/DashboardView.vue'
import { initialAuthState, useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/iniciar-sesion',
      name: 'Login',
      component: () => import('../auth/views/LoginView.vue'),
      sensitive: true
    },
    {
      path: '/',
      component: Navigation,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardView,
          meta: { requiresAuth: true },
          sensitive: true
        },
        {
          path: 'usuarios',
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'Users',
              component: () => import('../user/views/UsersView.vue'),
            },
          ]
        },
        {
          path: 'propiedades',
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'Housing',
              component: () => import('../housing/views/HousingView.vue'),
            },
          ]
        },
        {
          path: 'documento-de-identidad',
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'IdentityDoc',
              component: () => import('../identity-document/views/IdentityDocumentView.vue'),
            },
          ]
        },
        {
          path: 'inquilinos',
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'Tenancy',
              component: () => import('../tenancy/views/TenancyView.vue'),
            },
          ]
        },
        {
          path: 'cuartos',
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'HousingRoom',
              component: () => import('../housing-room/views/HousingRoomView.vue'),
            },
          ]
        },
        {
          path: 'alquileres',
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'HousingPayment',
              component: () => import('../housing-payment/views/HousingPaymentView.vue'),
            },
          ]
        },
      ]
    },
    {
      path: '/:(.*)*',
      redirect: { name: 'Dashboard' },
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.setUser(initialAuthState)
      router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (!!to.meta.requiresAuth && !isAuthenticated) {
    authStore.checkAuth('Iniciando sesión', 'Inicio de sesión exitoso', 'Inicio de sesión fallido', () => router.push({ name: to.name }))
    next()
  } else {
    next()
  }
})

export default router
