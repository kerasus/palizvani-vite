export default {
  path: '/auth',
  name: 'Auth',
  layoutConfig: {
    layoutHeaderVisible: false,
    layoutHeader: false,
    layoutLeftDrawer: false,
    layoutFooter: false,
    layoutFooterVisible: false
  },
  component: () => import('layouts/bareLayout.vue'),
  children: [
    {
      path: '/login/admin',
      name: 'AdminLogin',
      // meta: {
      //   middlewares: [notLogedIn]
      // },
      component: () => import('src/pages/Auth/Login.vue')
    },
    {
      path: '/login',
      name: 'Login',
      // meta: {
      //   middlewares: [notLogedIn]
      // },
      component: () => import('src/pages/Auth/Login.vue')
    }
  ]
}
