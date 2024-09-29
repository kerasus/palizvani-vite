import Auth from 'src/router/routes/Auth.js'
import Admin from 'src/router/routes/Admin.js'
import Public from 'src/router/routes/Public.js'
import Document from 'src/router/routes/Document.js'
import UserPanel from 'src/router/routes/UserPanel.js'

const routes = [
  {
    path: '',
    layoutConfig: {
      layoutView: 'lHh Lpr fff',
      layoutHeader: true,
      layoutHeaderType: 'main',
      layoutHeaderVisible: true,
      layoutHeaderReveal: false,
      layoutHeaderElevated: false,
      layoutHeaderBordered: false,
      layoutLeftDrawer: true,
      layoutLeftSideBarType: 'main',
      layoutLeftDrawerVisible: false,
      layoutLeftDrawerOverlay: false,
      layoutLeftDrawerElevated: false,
      layoutLeftDrawerBordered: false,
      layoutLeftDrawerWidth: 325,
      layoutLeftDrawerBehavior: 'default',
      layoutRightDrawer: false,
      layoutFooter: true,
      showHamburgerBtn: true,
      layoutFooterVisible: true,
      layoutFooterType: 'main',
      layoutHeaderCustomClass: '',
      layoutBreadcrumbsElements: [],
      layoutBreadcrumbs: {
        separator: 'home'
      },
      layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
      layoutPageContainerCustomClass: 'main-layout-container'
    },
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      hasDynamicSetting: false
    },
    children: [
      Auth,
      Admin,
      Public,
      Document,
      UserPanel
    ]
  },

  // must status 404
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/404/:catchAll(.*)*',
    name: 'NotFound',
    component:
      () => import('src/pages/Error404.vue')
  }
]
export default routes
