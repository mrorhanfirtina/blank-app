const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('pages/auth/Register.vue')
      }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'mal-kabul',
        name: 'mal-kabul',
        component: () => import('pages/mal-kabul/Index.vue')
      },
      {
        path: 'kalite-kontrol',
        name: 'kalite-kontrol',
        component: () => import('pages/kalite-kontrol/Index.vue')
      },
      {
        path: 'stok',
        name: 'stok',
        component: () => import('pages/stok/Index.vue')
      },
      {
        path: 'depo',
        name: 'depo',
        component: () => import('pages/depo/Index.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('pages/admin/Index.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/Login.vue')
      },
      {
        path: 'register',
        name: 'register-auth',
        component: () => import('pages/auth/Register.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
