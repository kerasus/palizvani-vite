import { Authenticated, canSeeUserProfilePanel, HasOverdueInstalment } from 'src/router/middleware/middleware'

export default {
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
      path: 'notice',
      name: 'UserPanel.Notice.List',
      component: () => import('src/pages/User/Notice/List.vue')
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
      path: 'my-orders',
      name: 'UserPanel.MyOrders',
      component: () => import('layouts/bareLayout.vue'),
      children: [
        { path: '', name: 'UserPanel.MyOrders.List', component: () => import('src/pages/User/MyOrders/List.vue') },
        { path: ':id', name: 'UserPanel.MyOrders.Show', component: () => import('src/pages/User/MyOrders/Show.vue') }
      ]
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
}
