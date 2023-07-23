import { notLogedIn, Authenticated, canSeeAdminPanel, canSeeUserProfilePanel } from './middleware/middleware.js'

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
    children: [
      {
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
            meta: {
              middlewares: [notLogedIn]
            },
            component: () => import('src/pages/Auth/Login.vue')
          },
          {
            path: '/login',
            name: 'Login',
            meta: {
              middlewares: [notLogedIn]
            },
            component: () => import('src/pages/Auth/Login.vue')
          }
        ]
      },
      {
        path: '',
        name: 'Public',
        layoutConfig: {
          layoutView: 'lhh Lpr fff'
        },
        component: () => import('layouts/bareLayout.vue'),
        meta: { middlewares: [canSeeUserProfilePanel] },
        children: [
          // {
          //   path: '',
          //   name: 'Public.Home',
          //   meta: {
          //     hasDynamicSetting: true
          //   },
          //   component: () => import('src/pages/Public/Home.vue')
          // },

          { name: 'Public.Home', path: '', component: () => import('src/pages/Public/index.vue') },
          { name: 'UserPanel.AllClassrooms', path: 'all-classrooms', component: () => import('src/pages/Public/classrooms.vue') },
          { name: 'UserPanel.ShowClassroomInfo', path: 'classroom/:id', component: () => import('src/pages/Public/ShowClassroomInfo.vue') }

        ]
      },
      {
        path: 'panel',
        name: 'UserPanel',
        layoutConfig: {
          showHamburgerBtn: false,
          layoutLeftSideBarType: 'user-panel'
        },
        meta: { middlewares: [Authenticated, canSeeUserProfilePanel] },
        component: () => import('src/layouts/bareLayout.vue'),
        children: [
          {
            name: 'UserPanel.ShopCompleteInfo',
            path: 'shop/completeInfo',
            meta: { middlewares: [Authenticated] },
            component: () => import('src/pages/User/Shop/completeInfo.vue')
          },
          {
            name: 'UserPanel.ShopPaymentFromWallet',
            path: 'shop/payment-from-wallet',
            meta: { middlewares: [Authenticated] },
            component: () => import('src/pages/User/Shop/paymentFromWallet.vue')
          },
          {
            name: 'UserPanel.PaymentResult',
            path: 'shop/payment-result',
            meta: { middlewares: [Authenticated] },
            component: () => import('src/pages/User/Shop/paymentResult.vue')
          },
          {
            path: 'profile',
            name: 'UserPanel.Profile',
            component: () => import('src/layouts/UserPanelLayout.vue'),
            meta: { middlewares: [Authenticated] },
            children: [
              { name: 'UserPanel.Profile.AllClassrooms', path: 'all-classrooms', component: () => import('src/pages/User/Profile/classrooms.vue') },
              { name: 'UserPanel.Profile.ClassroomInfo', path: 'classroom/:id', component: () => import('src/pages/User/Profile/classroomInfo.vue') },
              { name: 'UserPanel.Profile.SessionInfo', path: 'session/:id', component: () => import('src/pages/User/Profile/sessionInfo.vue') },
              { name: 'UserPanel.Profile.UserInfo', path: 'user-info', component: () => import('src/pages/User/Profile/profile.vue') }
            ]
          }
        ]
      },
      {
        path: 'admin',
        name: 'Admin',
        layoutConfig: {
          layoutView: 'hHh LpR fFf',
          layoutHeaderType: 'admin',
          layoutHeaderBordered: true,
          layoutLeftDrawer: true,
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'admin',
          layoutLeftDrawerBordered: true,
          layoutLeftDrawerWidth: 240,
          layoutFooter: false
        },
        meta: { middlewares: [Authenticated, canSeeAdminPanel] },
        component: () => import('src/layouts/AdminLayout.vue'),
        children: [
          {
            name: 'Admin.Settings',
            path: 'settings',
            component: () => import('src/pages/Admin/Settings.vue'),
            breadcrumbs: { title: 'تنظیمات' }
          },
          {
            name: 'Admin.User',
            path: 'users',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'کاربران' },
            children: [
              { name: 'Admin.User.Index', path: '', component: () => import('src/pages/Admin/User/index.vue') },
              { name: 'Admin.User.Show', path: ':id', component: () => import('src/pages/Admin/User/show.vue'), breadcrumbs: { title: 'اطلاعات کاربری' } }
            ]
          },
          {
            name: 'Admin.Category',
            path: 'categories',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دسته بندی ها' },
            children: [
              { name: 'Admin.Category.Index', path: '', component: () => import('src/pages/Admin/Category/index.vue') },
              { name: 'Admin.Category.Create', path: 'create', component: () => import('src/pages/Admin/Category/create.vue') },
              { name: 'Admin.Category.Show', path: ':id', component: () => import('src/pages/Admin/Category/show.vue') }
            ]
          },
          {
            name: 'Admin.Unit',
            path: 'units',
            component: () => import('src/layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            children: [
              // { name: 'Admin.Category.Index', path: '', component: () => import('src/pages/Admin/Category/index.vue') },
              // { name: 'Admin.Category.Create', path: 'create', component: () => import('src/pages/Admin/Category/create.vue') },
              { name: 'Admin.Unit.Show', path: ':id', component: () => import('src/pages/Admin/Unit/show.vue'), breadcrumbs: { title: 'درس' } }
            ]
          },
          {
            name: 'Admin.SessionTemplate',
            path: 'sessionTemplates',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            children: [
              { name: 'Admin.SessionTemplate.Index', path: '', component: () => import('src/pages/Admin/SessionTemplate/index.vue') },
              { name: 'Admin.SessionTemplate.Create', path: 'create', component: () => import('src/pages/Admin/SessionTemplate/create.vue') },
              { name: 'Admin.SessionTemplate.Show', path: ':id', component: () => import('src/pages/Admin/SessionTemplate/show.vue') }
            ]
          },
          {
            name: 'Admin.Classroom',
            path: 'classrooms',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دوره های آموزشی', route: { name: 'Admin.Classroom.Index' } },
            children: [
              { name: 'Admin.Classroom.Index', path: '', component: () => import('src/pages/Admin/Classroom/index.vue') },
              { name: 'Admin.Classroom.Create', path: 'create', component: () => import('src/pages/Admin/Classroom/create.vue'), breadcrumbs: { title: 'ساخت دوره آموزشی' } },
              { name: 'Admin.Classroom.Show', path: ':id', component: () => import('src/pages/Admin/Classroom/show.vue'), breadcrumbs: { title: 'مشاهده اطلاعات دوره آموزشی' } }
            ]
          },
          {
            name: 'Admin.Session',
            path: 'session',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            children: [
              { name: 'Admin.Session.Index', path: '', component: () => import('src/pages/Admin/Session/index.vue') },
              { name: 'Admin.Session.Create', path: 'create', component: () => import('src/pages/Admin/Session/create.vue') },
              { name: 'Admin.Session.Show', path: ':id', component: () => import('src/pages/Admin/Session/show.vue') }
            ]
          }
        ]
      },
      {
        path: 'document',
        name: 'Document',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: 'component',
            name: 'component',
            component: () => import('src/pages/Document/component.vue'),
            breadcrumbs: { title: 'component' },
            meta: {
              middlewares: [Authenticated]
            }
          },
          {
            path: 'theme',
            name: 'Document.Theme',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'Theme' },
            children: [
              {
                path: 'controls',
                name: 'Document.Theme.Controls',
                component: () => import('src/pages/Document/Theme/Controls.vue'),
                breadcrumbs: { title: 'Controls' }
              }
            ]
          },
          {
            path: 'debug',
            name: 'Document.Debug',
            component: () => import('src/pages/Document/debug.vue')
          },
          {
            path: 'icon-sax',
            name: 'Document.IconSax',
            component: () => import('src/pages/Document/IconSax.vue')
          },
          {
            path: '/form-generator',
            name: 'formGenerator',
            component: () => import('src/pages/Document/formGenerator.vue')
          }
        ]
      }
    ]
  }

  // must status 404
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/404/:catchAll(.*)*',
  //   name: 'NotFound',
  //   component:
  //     () => import('src/pages/Error404.vue')
  // }
]
export default routes
