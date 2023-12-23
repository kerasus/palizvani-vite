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
              { path: 'news', name: 'Public.Post.List.News', component: () => import('src/pages/Public/Post/News.vue') },
              { path: 'guide', name: 'Public.Post.List.Guide', component: () => import('src/pages/Public/Post/Guide.vue') },
              { path: ':id', name: 'Public.Post.Show', component: () => import('src/pages/Public/Post/Show.vue') }
            ]
          },
          { path: 'post_category/:category_id', name: 'Public.PostCategory.Show', component: () => import('src/pages/Public/Post/ChildCategoryPostList.vue') },
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
            name: 'Public.AllEvents',
            path: 'all-events',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/Events.vue')
          },
          {
            name: 'Public.ShowEventInfo',
            path: 'event/:id',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/ShowEventInfo.vue')
          },
          {
            name: 'Public.FAQ',
            path: 'faq',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/FAQ.vue')
          },
          {
            name: 'Public.Rules',
            path: 'rules',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/Rules.vue')
          },
          {
            name: 'Public.AboutUs',
            path: 'about-us',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/AboutUs.vue')
          },
          {
            name: 'Public.ContactUs',
            path: 'contact-us',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/ContactUs.vue')
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
                name: 'UserPanel.Profile.ClassroomInfo',
                path: 'classroom/:id',
                component: () => import('src/pages/User/Profile/classroomInfo.vue'),
                meta: {
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.Test',
                path: 'test/:id',
                component: () => import('src/pages/User/Profile/test.vue'),
                meta: {
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.AllEvents',
                path: 'all-events',
                component: () => import('src/pages/User/Profile/Events.vue'),
                meta: {
                  breadcrumbs: {
                    visible: true,
                    loading: false,
                    path: [
                      {
                        label: 'رویدادهای من',
                        to: { name: 'UserPanel.Profile.AllEvents' }
                      }
                    ]
                  },
                  middlewares: [HasOverdueInstalment]
                }
              },
              {
                name: 'UserPanel.Profile.EventInfo',
                path: 'event/:id',
                component: () => import('src/pages/User/Profile/EventInfo.vue'),
                meta: {
                  middlewares: [HasOverdueInstalment]
                }
              },
              { name: 'UserPanel.Profile.Classroom.Project.Show', path: 'classroom/:classroom_id/project/:project_id', component: () => import('src/pages/User/Profile/projectInfo.vue') },
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
              },
              {
                name: 'UserPanel.Leader',
                path: 'leader',
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  { name: 'UserPanel.Leader.Teams.Index', path: 'teams', component: () => import('pages/Admin/Leader/MyTeams.vue') },
                  { name: 'UserPanel.Leader.Teams.Show', path: 'teams/:team_id', component: () => import('pages/Admin/Leader/ShowTeam.vue') }
                ]
              },
              {
                name: 'UserPanel.Test',
                path: 'test/:test_id',
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  { name: 'UserPanel.Test.AnswerBook.Confirmation', path: 'answer_book/:answer_book_id/confirmation', component: () => import('src/pages/User/Test/Confirmation.vue') },
                  { name: 'UserPanel.Test.AnswerBook.Participate.AllQuestions', path: 'answer_book/:answer_book_id/participate/all_questions', component: () => import('src/pages/User/Test/ParticipateAllQuestions.vue') },
                  { name: 'UserPanel.Test.AnswerBook.Participate.SingleQuestion', path: 'answer_book/:answer_book_id/participate/question/:question_number', component: () => import('src/pages/User/Test/ParticipateSingleQuestion.vue') },
                  { name: 'UserPanel.Test.AnswerBook.Show', path: 'answer_book/:answer_book_id/show', component: () => import('src/pages/User/Test/Show.vue') },
                  { name: 'UserPanel.Test.AnswerBook.SendObjection', path: 'answer_book/:answer_book_id/sendObjection', component: () => import('src/pages/User/Test/SendObjection.vue') }
                ]
              },
              {
                name: 'UserPanel.Classroom.MyAsGraderClassroom',
                path: 'my_as_a_grader_classrooms',
                component: () => import('src/layouts/bareLayout.vue'),
                children: [
                  { name: 'UserPanel.Classroom.MyAsGraderClassroom.Index', path: '', component: () => import('src/pages/Admin/Classroom/MyAsGraderClassrooms.vue') },
                  { name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks', path: ':classroom_id/answer_books', component: () => import('src/pages/Admin/Classroom/ClassroomAnswerBooksForGrader.vue') },
                  { name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks.ShowGrade', path: ':classroom_id/answer_books/:answer_book_id/show_grades', component: () => import('src/pages/Admin/Classroom/ClassroomAnswerBookShowGradeForGrader.vue') },
                  { name: 'UserPanel.Classroom.MyAsGraderClassroom.AnswerBooks.SubmitGrade', path: ':classroom_id/answer_books/:answer_book_id/submit_grade', component: () => import('src/pages/Admin/Classroom/ClassroomAnswerBookSubmitGrade.vue') }
                ]
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
                meta: { middlewares: [Authenticated] },
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
                path: 'transactions',
                name: 'UserPanel.Payment.TransactionList',
                component: () => import('src/pages/User/Payment/TransactionList.vue')
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
              { name: 'Admin.Unit.Show', path: ':id', component: () => import('src/pages/Admin/Unit/show.vue') },
              {
                name: 'Admin.Unit.Questions',
                path: ':unit_id/session_template/:session_template_id/questions',
                component: () => import('src/layouts/bareLayout.vue'),
                children: [
                  { name: 'Admin.Unit.Questions.Index', path: '', component: () => import('src/pages/Admin/Unit/QuestionsList.vue') },
                  { name: 'Admin.Unit.Questions.Create', path: 'create', component: () => import('src/pages/Admin/Unit/QuestionsCreate.vue') }
                  // { name: 'Admin.Unit.Questions.Show', path: ':id', component: () => import('src/pages/Admin/Unit/QuestionsShow.vue') }
                ]
              },
              { name: 'Admin.Unit.Questions.Show', path: ':unit_id/questions/:id', component: () => import('src/pages/Admin/Unit/QuestionsShow.vue') },
              {
                name: 'Admin.Unit.TestSet',
                path: ':unit_id/test_set',
                component: () => import('src/layouts/bareLayout.vue'),
                children: [
                  { name: 'Admin.Unit.TestSet.Show', path: ':id', component: () => import('src/pages/Admin/TestSet/Show.vue') },
                  { name: 'Admin.Unit.TestSet.Create', path: 'create', component: () => import('src/pages/Admin/TestSet/Create.vue') }
                ]
              }
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
                path: 'educational',
                name: 'Admin.Ticket.List.Educational',
                component: () => import('src/pages/Admin/Ticket/EducationalList.vue')
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
            children: [
              { name: 'Admin.Classroom.Index', path: '', component: () => import('src/pages/Admin/Classroom/index.vue') },
              { name: 'Admin.Classroom.Create', path: 'create', component: () => import('src/pages/Admin/Classroom/create.vue'), breadcrumbs: { title: 'ساخت دوره آموزشی' } },
              { name: 'Admin.Classroom.Show', path: ':id', component: () => import('src/pages/Admin/Classroom/show.vue') },
              { name: 'Admin.Classroom.Session.AttendanceSheetList', path: ':classroom_id/session/:session_id/session_attendance_sheets', component: () => import('pages/Admin/Classroom/SessionActivitySheets/sessionActivitySheets.vue') },
              { name: 'Admin.Classroom.Session.AttendanceSheet.Assignment', path: ':classroom_id/session/:session_id/session_attendance_sheet/:session_attendance_sheet_id/assignment', component: () => import('pages/Admin/Classroom/SessionActivitySheets/Assignment.vue') },
              { name: 'Admin.Classroom.Session.AttendanceSheet.Attendance', path: ':classroom_id/session/:session_id/session_attendance_sheet/:session_attendance_sheet_id/attendance', component: () => import('pages/Admin/Classroom/SessionActivitySheets/Attendance.vue') },
              { name: 'Admin.Classroom.Project.Create', path: ':classroom_id/project/create', component: () => import('src/pages/Admin/Classroom/project/create.vue') },
              { name: 'Admin.Classroom.Project.Show', path: ':classroom_id/project/:project_id', component: () => import('src/pages/Admin/Classroom/project/show.vue') },
              { name: 'Admin.Classroom.Project.Members', path: ':classroom_id/project/:project_id/members', component: () => import('src/pages/Admin/Classroom/project/members.vue') },
              { name: 'Admin.Classroom.projectAttendanceSheets.Show', path: ':classroom_id/project/:project_id/projectAttendanceSheet/:project_attendance_sheets_id', component: () => import('src/pages/Admin/Classroom/ProjectAttendanceSheet/show.vue') },
              { name: 'Admin.Classroom.Team.Create', path: ':classroom_id/team/create', component: () => import('src/pages/Admin/Classroom/Team/create.vue') },
              { name: 'Admin.Classroom.Team.Show', path: ':classroom_id/team/:team_id', component: () => import('src/pages/Admin/Classroom/Team/show.vue') },
              { name: 'Admin.Classroom.Ticket', path: 'ticket', component: () => import('src/pages/Admin/Classroom/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } },

              { name: 'Admin.Classroom.TestSet.Index', path: ':classroom_id/test_set', component: () => import('src/pages/Admin/TestSet/Index.vue') },
              { name: 'Admin.Classroom.TestSet.Test.Show', path: ':classroom_id/test_set/:test_set_id/test/:id', component: () => import('src/pages/Admin/Test/Show.vue') },
              { name: 'Admin.Classroom.TestSet.Test.Create', path: ':classroom_id/test_set/:test_set_id/test/create', component: () => import('src/pages/Admin/Test/Create.vue') },

              { name: 'Admin.Classroom.Test.AnswerBooks.Index', path: ':classroom_id/test/:test_id/answer_books', component: () => import('src/pages/Admin/Classroom/ClassroomAnswerBooks.vue') },
              { name: 'Admin.Classroom.Test.AnswerBooks.ShowGrade', path: ':classroom_id/test/:test_id/answer_books/:answer_book_id/show_grades', component: () => import('src/pages/Admin/Classroom/ClassroomAnswerBookShowGrade.vue') }
            ]
          },
          {
            name: 'Admin.Event',
            path: 'events',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دوره های آموزشی', route: { name: 'Admin.Event.Index' } },
            children: [
              { name: 'Admin.Event.Index', path: '', component: () => import('src/pages/Admin/Event/index.vue') },
              { name: 'Admin.Event.Create', path: 'create', component: () => import('src/pages/Admin/Event/create.vue'), breadcrumbs: { title: 'ساخت دوره آموزشی' } },
              { name: 'Admin.Event.Show', path: ':id', component: () => import('src/pages/Admin/Event/show.vue') },
              { name: 'Admin.Event.Session.AttendanceSheetList', path: ':classroom_id/session/:session_id/session_attendance_sheets', component: () => import('pages/Admin/Event/SessionActivitySheets/sessionActivitySheets.vue') },
              { name: 'Admin.Event.Session.AttendanceSheet.Assignment', path: ':classroom_id/session/:session_id/session_attendance_sheet/:session_attendance_sheet_id/assignment', component: () => import('pages/Admin/Event/SessionActivitySheets/Assignment.vue') },
              { name: 'Admin.Event.Session.AttendanceSheet.Attendance', path: ':classroom_id/session/:session_id/session_attendance_sheet/:session_attendance_sheet_id/attendance', component: () => import('pages/Admin/Event/SessionActivitySheets/Attendance.vue') },
              { name: 'Admin.Event.Project.Create', path: ':classroom_id/project/create', component: () => import('src/pages/Admin/Event/project/create.vue'), breadcrumbs: { title: 'ساخت دوره آموزشی' } },
              { name: 'Admin.Event.Project.Show', path: ':classroom_id/project/:project_id', component: () => import('src/pages/Admin/Event/project/show.vue') },
              { name: 'Admin.Event.Project.Members', path: ':classroom_id/project/:project_id/members', component: () => import('src/pages/Admin/Event/project/members.vue') },
              { name: 'Admin.Event.projectAttendanceSheets.Show', path: ':classroom_id/project/:project_id/projectAttendanceSheet/:project_attendance_sheets_id', component: () => import('src/pages/Admin/Event/ProjectAttendanceSheet/show.vue') },
              // { name: 'Admin.Event.Project', path: ':id', component: () => import('src/pages/Admin/Event/show.vue') },
              { name: 'Admin.Event.Ticket', path: 'ticket', component: () => import('src/pages/Admin/Event/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } },

              { name: 'Admin.Event.TestSet.Index', path: 'test_set', component: () => import('src/pages/Admin/Event/Test/Index.vue') },
              { name: 'Admin.Event.TestSet.Create', path: 'test_set/create', component: () => import('src/pages/Admin/Event/Test/Create.vue') },
              { name: 'Admin.Event.TestSet.Show', path: 'test_set/:test_set_id', component: () => import('src/pages/Admin/Event/Test/Show.vue') },

              { name: 'Admin.Event.TestSet.Questions.Index', path: 'test_set/:test_set_id/questions', component: () => import('src/pages/Admin/Event/Question/Index.vue') },
              { name: 'Admin.Event.TestSet.Questions.Create', path: 'test_set/questions/create', component: () => import('src/pages/Admin/Event/Question/Create.vue') },
              { name: 'Admin.Event.TestSet.Questions.Show', path: 'test_set/questions/:question_id', component: () => import('src/pages/Admin/Event/Question/Show.vue') }
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
