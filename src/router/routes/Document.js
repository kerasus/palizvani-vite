import { Authenticated } from 'src/router/middleware/middleware'

export default {
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
