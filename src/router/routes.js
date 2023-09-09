import { /* notLogedIn, */Authenticated, canSeeAdminPanel, canSeeUserProfilePanel, HasOverdueInstalment } from './middleware/middleware.js'

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
      hasDynamicSetting: true
    },
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
      },
      {
        path: '',
        name: 'Public',
        component: () => import('layouts/bareLayout.vue'),
        meta: { middlewares: [canSeeUserProfilePanel] },
        children: [
          {
            name: 'Public.Home',
            path: '',
            layoutConfig: {
              layoutView: 'lhh Lpr fff'
            },
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/index.vue')
          },
          {
            path: 'post',
            name: 'Public.Post',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'Public.Post.List', component: () => import('src/pages/Public/Post/List.vue') },
              { path: ':id', name: 'Public.Post.Show', component: () => import('src/pages/Public/Post/Show.vue') }
            ]
          },
          {
            name: 'Public.AllClassrooms',
            path: 'all-classrooms',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/classrooms.vue')
          },
          {
            name: 'Public.ShowClassroomInfo',
            path: 'classroom/:id',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/ShowClassroomInfo.vue')
          },
          {
            name: 'Public.FAQ',
            path: 'faq',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/FAQ.vue')
          }
        ]
      },
      {
        path: 'panel',
        name: 'UserPanel',
        layoutConfig: {
          layoutView: 'hHh LpR lfr',
          layoutHeaderType: 'user-panel',
          layoutHeaderBordered: true,
          layoutLeftDrawer: true,
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'user-panel',
          layoutLeftDrawerBordered: true,
          layoutLeftDrawerWidth: 240,
          layoutFooterType: 'panel',
          layoutFooter: true
        },
        meta: { middlewares: [Authenticated, canSeeUserProfilePanel] },
        component: () => import('src/layouts/UserPanelLayout.vue'),
        children: [
          {
            name: 'UserPanel.ShopCompleteInfo',
            path: 'shop/completeInfo',
            layoutConfig: {
              layoutView: 'hHh LpR fff',
              layoutHeaderType: 'main',
              layoutHeaderBordered: true,
              layoutLeftDrawer: false,
              layoutLeftDrawerVisible: false,
              layoutFooter: true
            },
            component: () => import('src/pages/User/Shop/completeInfo.vue')
          },
          {
            name: 'UserPanel.ShopPaymentFromWallet',
            path: 'shop/payment-from-wallet',
            layoutConfig: {
              layoutView: 'hHh LpR fff',
              layoutHeaderType: 'main',
              layoutHeaderBordered: true,
              layoutLeftDrawer: false,
              layoutLeftDrawerVisible: false,
              layoutFooter: true
            },
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
            component: () => import('src/layouts/bareLayout.vue'),
            meta: { middlewares: [Authenticated] },
            children: [
              {
                name: 'UserPanel.Profile.OverdueInstalments',
                path: 'overdue-instalments',
                component: () => import('src/pages/User/Profile/OverdueInstalment.vue')
              },
              {
                name: 'UserPanel.Profile.AllClassrooms',
                path: 'all-classrooms',
                component: () => import('src/pages/User/Profile/classrooms.vue'),
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'دوره های من',
                        to: { name: 'UserPanel.Profile.AllClassrooms' }
                      }
                    ]
                  },
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.AllDiscussionCirclesClassrooms',
                path: 'all-discussion-circles-classrooms',
                component: () => import('src/pages/User/Profile/DiscussionCirclesClassrooms.vue'),
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'حلقه های مباحثاتی من',
                        to: { name: 'UserPanel.Profile.AllDiscussionCirclesClassrooms' }
                      }
                    ]
                  },
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.ClassroomInfo',
                path: 'classroom/:id',
                component: () => import('src/pages/User/Profile/classroomInfo.vue'),
                meta: {
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.SessionInfo',
                path: 'session/:id',
                component: () => import('src/pages/User/Profile/sessionInfo.vue'),
                meta: {
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.UserInfo',
                path: 'user-info',
                component: () => import('src/pages/User/Profile/profile.vue')
              }
            ]
          },
          {
            path: 'invoice',
            name: 'UserPanel.Invoice',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Invoice.List',
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'بخش مالی'
                      },
                      {
                        label: 'صورتحساب ها',
                        to: { name: 'UserPanel.Invoice.List' }
                      }
                    ]
                  }
                },
                component: () => import('src/pages/User/Invoice/List.vue')
              },
              {
                path: 'thankyou',
                name: 'UserPanel.Invoice.Thankyou',
                component: () => import('src/pages/User/Invoice/Thankyou.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Invoice.Show',
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'بخش مالی'
                      },
                      {
                        label: 'صورتحساب ها',
                        to: { name: 'UserPanel.Invoice.List' }
                      },
                      {
                        label: 'جزییات صورتحساب'
                      }
                    ]
                  }
                },
                component: () => import('src/pages/User/Invoice/Show.vue')
              },
              {
                path: 'ticket',
                name: 'UserPanel.Invoice.Ticket',
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  {
                    path: '',
                    name: 'UserPanel.Invoice.Ticket.List',
                    component: () => import('src/pages/User/Invoice/Ticket/List.vue')
                  },
                  {
                    path: ':id',
                    name: 'UserPanel.Invoice.Ticket.Show',
                    component: () => import('src/pages/User/Invoice/Ticket/Show.vue')
                  },
                  {
                    path: 'create',
                    name: 'UserPanel.Invoice.Ticket.Create',
                    component: () => import('src/pages/User/Invoice/Ticket/Create.vue')
                  }
                ]
              }
            ]
          },
          {
            path: 'ticket',
            name: 'UserPanel.Ticket',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Ticket.List',
                component: () => import('src/pages/User/Ticket/List.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Ticket.Show',
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'درخواست ها',
                        to: { name: 'UserPanel.Ticket.List' }
                      },
                      {
                        label: 'جزییات درخواست'
                      }
                    ]
                  }
                },
                component: () => import('src/pages/User/Ticket/Show.vue')
              },
              {
                path: 'create',
                name: 'UserPanel.Ticket.Create',
                component: () => import('src/pages/User/Ticket/Create.vue')
              }
            ]
          },
          {
            path: 'wallet',
            name: 'UserPanel.Wallet',
            component: () => import('src/pages/User/Wallet/Show.vue'),
            meta: {
              breadcrumbs: {
                visible: true,
                loading: false,
                path: [
                  {
                    label: 'بخش مالی'
                  },
                  {
                    label: 'کیف پول الکترونیک',
                    to: { name: 'UserPanel.Wallet' }
                  }
                ]
              }
            }
          },
          {
            path: 'payment',
            name: 'UserPanel.Payment',
            component: () => import('src/layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Payment.List',
                component: () => import('src/pages/User/Payment/List.vue')
              },
              {
                name: 'UserPanel.Payment.Show',
                path: ':id',
                component: () => import('src/pages/User/Payment/Show.vue'),
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'کیف پول الکترونیک',
                        to: { name: 'UserPanel.Wallet' }
                      },
                      {
                        label: 'جزییات پرداخت'
                      }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: 'admin',
        name: 'Admin',
        layoutConfig: {
          layoutView: 'hHh LpR lfr',
          layoutHeaderType: 'admin',
          layoutHeaderBordered: true,
          layoutLeftDrawer: true,
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'admin',
          layoutLeftDrawerBordered: true,
          layoutLeftDrawerWidth: 240,
          layoutFooterType: 'panel',
          layoutFooter: true
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
              { name: 'Admin.User.Show', path: ':id', component: () => import('src/pages/Admin/User/show.vue'), breadcrumbs: { title: 'اطلاعات کاربری' } },
              { name: 'Admin.User.ClassroomInfo', path: ':id/classroom/:classroom_id', component: () => import('src/pages/Admin/User/UserClassroomInfo.vue'), breadcrumbs: { title: 'اطلاعات کاربری' } }
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
            name: 'Admin.Category.DiscussionCircles',
            path: 'discussion-circles-categories',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دسته بندی ها' },
            children: [
              { name: 'Admin.Category.DiscussionCircles.Index', path: '', component: () => import('src/pages/Admin/DiscussionCirclesCategory/index.vue') },
              { name: 'Admin.Category.DiscussionCircles.Create', path: 'create', component: () => import('src/pages/Admin/DiscussionCirclesCategory/create.vue') },
              { name: 'Admin.Category.DiscussionCircles.Show', path: ':id', component: () => import('src/pages/Admin/DiscussionCirclesCategory/show.vue') }
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
            path: 'session-templates',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            children: [
              { name: 'Admin.SessionTemplate.Index', path: '', component: () => import('src/pages/Admin/SessionTemplate/index.vue') },
              { name: 'Admin.SessionTemplate.Create', path: 'create', component: () => import('src/pages/Admin/SessionTemplate/create.vue') },
              { name: 'Admin.SessionTemplate.Show', path: ':id', component: () => import('src/pages/Admin/SessionTemplate/show.vue') }
            ]
          },
          {
            path: 'ticket',
            name: 'Admin.Ticket',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Admin.Ticket.List',
                component: () => import('src/pages/Admin/Ticket/List.vue')
              },
              {
                path: 'create',
                name: 'Admin.Ticket.Create',
                component: () => import('src/pages/Admin/Ticket/Create.vue')
              },
              {
                path: ':id',
                name: 'Admin.Ticket.Show',
                component: () => import('src/pages/Admin/Ticket/Show.vue')
              }
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
              { name: 'Admin.Classroom.Show', path: ':id', component: () => import('src/pages/Admin/Classroom/show.vue'), breadcrumbs: { title: 'مشاهده اطلاعات دوره آموزشی' } },
              { name: 'Admin.Classroom.Ticket', path: 'ticket', component: () => import('src/pages/Admin/Classroom/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } }
            ]
          },
          {
            name: 'Admin.Classroom.DiscussionCircles',
            path: 'discussion-circles-classrooms',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دوره های آموزشی', route: { name: 'Admin.Classroom.DiscussionCircles.Index' } },
            children: [
              { name: 'Admin.Classroom.DiscussionCircles.Index', path: '', component: () => import('src/pages/Admin/DiscussionCirclesClassroom/index.vue') },
              { name: 'Admin.Classroom.DiscussionCircles.Create', path: 'create', component: () => import('src/pages/Admin/DiscussionCirclesClassroom/create.vue'), breadcrumbs: { title: 'ساخت دوره آموزشی' } },
              { name: 'Admin.Classroom.DiscussionCircles.Show', path: ':id', component: () => import('src/pages/Admin/DiscussionCirclesClassroom/show.vue'), breadcrumbs: { title: 'مشاهده اطلاعات دوره آموزشی' } },
              { name: 'Admin.Classroom.DiscussionCircles.Ticket', path: 'ticket', component: () => import('src/pages/Admin/DiscussionCirclesClassroom/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } }
            ]
          },
          {
            path: 'content',
            name: 'Admin.Content',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'Admin.Content.List', component: () => import('src/pages/Admin/Content/List.vue') },
              { path: 'create', name: 'Admin.Content.Create', component: () => import('src/pages/Admin/Content/Create.vue') },
              { path: ':id', name: 'Admin.Content.Show', component: () => import('src/pages/Admin/Content/Show.vue') },
              { name: 'Admin.Content.Ticket', path: 'ticket', component: () => import('src/pages/Admin/Content/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } }
            ]
          },
          {
            path: 'post',
            name: 'Admin.Post',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'Admin.Post.List', component: () => import('src/pages/Admin/Post/List.vue') },
              { path: 'create', name: 'Admin.Post.Create', component: () => import('src/pages/Admin/Post/Create.vue') },
              { path: ':id', name: 'Admin.Post.Show', component: () => import('src/pages/Admin/Post/Show.vue') }
            ]
          },
          {
            path: 'media',
            name: 'Admin.Media',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              // { path: '', name: 'Admin.Content.List', component: () => import('src/pages/Admin/Content/List.vue') },
              // { path: 'create', name: 'Admin.Content.Create', component: () => import('src/pages/Admin/Content/Create.vue') },
              { path: ':id', name: 'Admin.Media.Show', component: () => import('src/pages/Admin/Media/Show.vue') }
              // { name: 'Admin.Content.Ticket', path: 'ticket', component: () => import('src/pages/Admin/Classroom/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } }
            ]
          },
          {
            path: 'content-category',
            name: 'Admin.ContentCategory',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'Admin.ContentCategory.List', component: () => import('src/pages/Admin/ContentCategory/List.vue') },
              { path: 'create', name: 'Admin.ContentCategory.Create', component: () => import('src/pages/Admin/ContentCategory/Create.vue') },
              { path: ':id', name: 'Admin.ContentCategory.Show', component: () => import('src/pages/Admin/ContentCategory/Show.vue') }
            ]
          },
          {
            path: 'post-category',
            name: 'Admin.PostCategory',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'Admin.PostCategory.List', component: () => import('src/pages/Admin/PostCategory/List.vue') },
              { path: 'create', name: 'Admin.PostCategory.Create', component: () => import('src/pages/Admin/PostCategory/Create.vue') },
              { path: ':id', name: 'Admin.PostCategory.Show', component: () => import('src/pages/Admin/PostCategory/Show.vue') }
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
          },
          {
            path: 'invoice',
            name: 'Admin.Invoice',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Admin.Invoice.List',
                component: () => import('src/pages/Admin/Invoice/List.vue')
              },
              {
                path: ':id',
                name: 'Admin.Invoice.Show',
                component: () => import('src/pages/Admin/Invoice/Show.vue')
              },
              {
                path: 'ticket',
                name: 'Admin.Invoice.Ticket',
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  {
                    path: '',
                    name: 'Admin.Invoice.Ticket.List',
                    component: () => import('src/pages/Admin/Invoice/Ticket/List.vue')
                  },
                  {
                    path: ':id',
                    name: 'Admin.Invoice.Ticket.Show',
                    component: () => import('src/pages/Admin/Invoice/Ticket/Show.vue')
                  }
                ]
              }
            ]
          },
          {
            path: 'payment',
            name: 'Admin.Payment',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Admin.Payment.List',
                component: () => import('src/pages/Admin/Payment/List.vue')
              },
              {
                path: ':id',
                name: 'Admin.Payment.Show',
                component: () => import('src/pages/Admin/Payment/Show.vue')
              }
            ]
          },
          {
            path: 'transaction',
            name: 'Admin.Transaction',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Admin.Transaction.List',
                component: () => import('src/pages/Admin/Transaction/List.vue')
              },
              {
                path: ':id',
                name: 'Admin.Transaction.Show',
                component: () => import('src/pages/Admin/Transaction/Show.vue')
              }
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
