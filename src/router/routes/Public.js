import { canSeeUserProfilePanel } from 'src/router/middleware/middleware'

export default {
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
      meta: {
        hasDynamicSetting: true
      },
      children: [
        { path: '', name: 'Public.Post.List', component: () => import('src/pages/Public/Post/List.vue') },
        { path: 'news', name: 'Public.Post.List.News', component: () => import('src/pages/Public/Post/News.vue') },
        { path: 'guide', name: 'Public.Post.List.Guide', component: () => import('src/pages/Public/Post/Guide.vue') },
        { path: ':id', name: 'Public.Post.Show', component: () => import('src/pages/Public/Post/Show.vue') }
      ]
    },
    {
      path: 'content',
      name: 'Public.Content',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('layouts/bareLayout.vue'),
      children: [
        {
          path: '',
          name: 'Public.Content.List',
          component: () => import('src/pages/BasicDynamicPage.vue')
        },
        {
          path: ':id',
          name: 'Public.Content.Show',
          component: () => import('src/pages/BasicDynamicPage.vue')
        }
      ]
    },
    {
      path: 'content_category',
      name: 'Public.ContentCategory',
      component: () => import('layouts/bareLayout.vue'),
      meta: {
        hasDynamicSetting: true
      },
      children: [
        {
          path: 'parent/parent',
          name: 'Public.ContentCategoryParentParent.List',
          component: () => import('src/pages/BasicDynamicPage.vue')
        },
        {
          path: 'parent/parent/:category_id',
          name: 'Public.ContentCategoryParentParent.Show',
          component: () => import('src/pages/BasicDynamicPage.vue')
        },
        {
          path: 'parent/:category_id',
          name: 'Public.ContentCategoryParent.Show',
          component: () => import('src/pages/BasicDynamicPage.vue')
        },
        {
          path: ':category_id',
          name: 'Public.ContentCategory.Show',
          component: () => import('src/pages/BasicDynamicPage.vue')
        }
      ]
    },
    {
      path: 'post-topic',
      name: 'Public.PostTopic',
      component: () => import('layouts/bareLayout.vue'),
      meta: {
        hasDynamicSetting: true
      },
      children: [
        { path: '', name: 'Public.PostTopic.List', component: () => import('src/pages/BasicDynamicPage.vue') },
        { path: ':id', name: 'Public.PostTopic.Show', component: () => import('src/pages/BasicDynamicPage.vue') }
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
      path: 'donation-category',
      name: 'Public.DonationCategory',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('layouts/bareLayout.vue'),
      children: [
        { path: '', name: 'Public.DonationCategory.List', component: () => import('src/pages/BasicDynamicPage.vue') },
        { path: ':donation_category_id', name: 'Public.DonationCategory.Show', component: () => import('src/pages/BasicDynamicPage.vue') },
        { path: ':donation_category_id/donation', name: 'Public.DonationCategory.Donation.list', component: () => import('src/pages/BasicDynamicPage.vue') },
        { path: ':donation_category_id/donation/:donation_id', name: 'Public.DonationCategory.Donation.Show', component: () => import('src/pages/BasicDynamicPage.vue') }
      ]
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
      name: 'Public.Shop',
      path: 'shop',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('src/pages/BasicDynamicPage.vue')
    },
    {
      name: 'Public.Package',
      path: 'package/:id',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('src/pages/BasicDynamicPage.vue')
    },
    {
      name: 'Public.Product',
      path: 'product/:id',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('src/pages/BasicDynamicPage.vue')
    },
    {
      name: 'Public.Cart',
      path: 'cart',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('src/pages/BasicDynamicPage.vue')
    },
    {
      name: 'Public.Professor',
      path: 'professor',
      meta: {
        hasDynamicSetting: true
      },
      component: () => import('layouts/bareLayout.vue'),
      children: [
        {
          path: '',
          name: 'Public.Professor.List',
          component: () => import('src/pages/BasicDynamicPage.vue')
        },
        {
          path: ':professor_name',
          name: 'Public.Professor.Show',
          meta: {
            hasDynamicSetting: true,
            hasDynamicSettingWithParams: true
          },
          component: () => import('src/pages/Public/professorLanding.vue')
        }
      ]
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
}
