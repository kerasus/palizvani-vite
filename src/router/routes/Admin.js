import { Authenticated, canSeeAdminPanel } from 'src/router/middleware/middleware'

export default {
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
        { name: 'Admin.Classroom.UserClass', path: ':classroom_id/user/:user_id', component: () => import('src/pages/Admin/Classroom/showUserClass.vue') },
        { name: 'Admin.Classroom.Session.AttendanceSheetList', path: ':classroom_id/session/:session_id/session_attendance_sheets', component: () => import('pages/Admin/Classroom/SessionActivitySheets/sessionActivitySheets.vue') },
        { name: 'Admin.Classroom.Session.AttendanceSheet.Assignment', path: ':classroom_id/session/:session_id/session_attendance_sheet/:session_attendance_sheet_id/assignment', component: () => import('pages/Admin/Classroom/SessionActivitySheets/Assignment.vue') },
        { name: 'Admin.Classroom.Session.AttendanceSheet.Attendance', path: ':classroom_id/session/:session_id/session_attendance_sheet/:session_attendance_sheet_id/attendance', component: () => import('pages/Admin/Classroom/SessionActivitySheets/Attendance.vue') },
        { name: 'Admin.Classroom.Project.Create', path: ':classroom_id/project/create', component: () => import('src/pages/Admin/Classroom/project/create.vue') },
        { name: 'Admin.Classroom.Project.Show', path: ':classroom_id/project/:project_id', component: () => import('src/pages/Admin/Classroom/project/show.vue') },
        { name: 'Admin.Classroom.Project.UserInfo', path: ':classroom_id/project/:project_id/user/:user_id', component: () => import('src/pages/Admin/Classroom/project/showUserProject.vue') },
        { name: 'Admin.Classroom.Project.Members', path: ':classroom_id/project/:project_id/members', component: () => import('src/pages/Admin/Classroom/project/members.vue') },
        { name: 'Admin.Classroom.projectAttendanceSheets.Show', path: ':classroom_id/project/:project_id/projectAttendanceSheet/:project_attendance_sheets_id', component: () => import('src/pages/Admin/Classroom/ProjectAttendanceSheet/show.vue') },
        { name: 'Admin.Classroom.Team.Create', path: ':classroom_id/team/create', component: () => import('src/pages/Admin/Classroom/Team/create.vue') },
        { name: 'Admin.Classroom.Team.Show', path: ':classroom_id/team/:team_id', component: () => import('src/pages/Admin/Classroom/Team/show.vue') },
        { name: 'Admin.Classroom.Ticket', path: 'ticket', component: () => import('src/pages/Admin/Classroom/Ticket.vue'), breadcrumbs: { title: 'درخواست ها دوره های آموزشی' } },

        { name: 'Admin.Classroom.TestSet.Index', path: ':classroom_id/unit/:unit_id/test_set', component: () => import('src/pages/Admin/TestSet/Index.vue') },
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
        { name: 'Admin.Event.TestSet.Questions.Show', path: 'test_set/questions/:question_id', component: () => import('src/pages/Admin/Event/Question/Show.vue') },

        { name: 'Admin.Event.TestSet.Test.Create', path: ':event_id/test_set/:test_set_id/test/create', component: () => import('src/pages/Admin/Event/Question/Show.vue') }
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
      path: 'hadith',
      name: 'Admin.Hadith',
      component: () => import('layouts/bareLayout.vue'),
      children: [
        { path: '', name: 'Admin.Hadith.List', component: () => import('src/pages/Admin/Hadith/List.vue') },
        { path: 'create', name: 'Admin.Hadith.Create', component: () => import('src/pages/Admin/Hadith/Create.vue') },
        { path: ':id', name: 'Admin.Hadith.Show', component: () => import('src/pages/Admin/Hadith/Show.vue') }
      ]
    },
    {
      path: 'donation',
      name: 'Admin.Donation',
      component: () => import('layouts/bareLayout.vue'),
      children: [
        { path: '', name: 'Admin.Donation.List', component: () => import('src/pages/Admin/Donation/List.vue') },
        { path: 'create', name: 'Admin.Donation.Create', component: () => import('src/pages/Admin/Donation/Create.vue') },
        { path: ':id', name: 'Admin.Donation.Show', component: () => import('src/pages/Admin/Donation/Show.vue') }
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
      path: 'notice',
      name: 'Admin.Notice',
      component: () => import('layouts/bareLayout.vue'),
      children: [
        {
          path: '',
          name: 'Admin.Notice.List',
          component: () => import('src/pages/Admin/Notice/List.vue')
        },
        {
          path: 'create',
          name: 'Admin.Notice.Create',
          component: () => import('src/pages/Admin/Notice/Create.vue')
        },
        {
          path: ':id',
          name: 'Admin.Notice.Show',
          component: () => import('src/pages/Admin/Notice/Show.vue')
        }
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
      path: 'donation-category',
      name: 'Admin.DonationCategory',
      component: () => import('layouts/bareLayout.vue'),
      children: [
        { path: '', name: 'Admin.DonationCategory.List', component: () => import('src/pages/Admin/DonationCategory/List.vue') },
        { path: 'create', name: 'Admin.DonationCategory.Create', component: () => import('src/pages/Admin/DonationCategory/Create.vue') },
        { path: ':id', name: 'Admin.DonationCategory.Show', component: () => import('src/pages/Admin/DonationCategory/Show.vue') }
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
        { name: 'Admin.Session.Show', path: ':id', component: () => import('src/pages/Admin/Session/show.vue') },
        { name: 'Admin.Session.UserClass', path: ':session_id/user/:user_id', component: () => import('src/pages/Admin/Session/showUserSession.vue') }
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
      path: 'store',
      name: 'Admin.Store',
      component: () => import('layouts/bareLayout.vue'),
      children: [
        {
          path: 'category',
          name: 'Admin.Store.Category',
          component: () => import('layouts/bareLayout.vue'),
          children: [
            { path: '', name: 'Admin.Store.Category.List', component: () => import('src/pages/Admin/StoreCategory/List.vue') },
            { path: 'create', name: 'Admin.Store.Category.Create', component: () => import('src/pages/Admin/StoreCategory/Create.vue') },
            { path: ':id', name: 'Admin.Store.Category.Show', component: () => import('src/pages/Admin/StoreCategory/Show.vue') }
          ]
        },
        {
          path: 'package',
          name: 'Admin.Store.Package',
          component: () => import('layouts/bareLayout.vue'),
          children: [
            { path: '', name: 'Admin.Store.Package.List', component: () => import('src/pages/Admin/StorePackage/List.vue') },
            { path: 'create', name: 'Admin.Store.Package.Create', component: () => import('src/pages/Admin/StorePackage/Create.vue') },
            { path: ':id', name: 'Admin.Store.Package.Show', component: () => import('src/pages/Admin/StorePackage/Show.vue') }
          ]
        },
        {
          path: 'product',
          name: 'Admin.Store.Product',
          component: () => import('layouts/bareLayout.vue'),
          children: [
            { path: '', name: 'Admin.Store.Product.List', component: () => import('src/pages/Admin/StoreProduct/List.vue') },
            { path: 'create', name: 'Admin.Store.Product.Create', component: () => import('src/pages/Admin/StoreProduct/Create.vue') },
            { path: ':id', name: 'Admin.Store.Product.Show', component: () => import('src/pages/Admin/StoreProduct/Show.vue') }
          ]
        },
        {
          path: 'discount',
          name: 'Admin.Store.Discount',
          component: () => import('layouts/bareLayout.vue'),
          children: [
            { path: '', name: 'Admin.Store.Discount.List', component: () => import('src/pages/Admin/StoreDiscount/List.vue') },
            { path: 'create', name: 'Admin.Store.Discount.Create', component: () => import('src/pages/Admin/StoreDiscount/Create.vue') },
            { path: ':id', name: 'Admin.Store.Discount.Show', component: () => import('src/pages/Admin/StoreDiscount/Show.vue') }
          ]
        },
        {
          path: 'basket',
          name: 'Admin.Store.Basket',
          component: () => import('layouts/bareLayout.vue'),
          children: [
            { path: '', name: 'Admin.Store.Basket.List', component: () => import('src/pages/Admin/StoreBasket/List.vue') },
            { path: ':id', name: 'Admin.Store.Basket.Show', component: () => import('src/pages/Admin/StoreBasket/Show.vue') }
          ]
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
}
