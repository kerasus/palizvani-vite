import { boot } from 'quasar/wrappers'
// import { getRouteWithParent, createLayoutConfigArray } from 'quasar-template-builder'
import helper from 'quasar-template-builder/src/helper.js'
const { getRouteWithParent, createLayoutConfigArray } = helper
export default boot(({ router, store }) => {
  router.beforeEach((to) => {
    if (to.meta.breadcrumbs) {
      store.commit('AppLayout/updateBreadcrumbs', to.meta.breadcrumbs)
    }
    const routeWithParent = getRouteWithParent({ children: router.options.routes }, to.name, store)
    const layoutArray = createLayoutConfigArray(routeWithParent)
    layoutArray.forEach(config => {
      store.dispatch('AppLayout/updateStore', config)
    })
  })
})
