import { boot } from 'quasar/wrappers'
// import { APIGateway } from 'src/api/APIGateway.js'
export default boot((context) => {
  // const store = context.store
  const router = context.router

  router.beforeEach(async (to, from, next) => {
    // // clear currentSections for new route
    // if (to.name !== from.name) {
    //   store.commit('PageBuilder/updateCurrentSections', null)
    // }
    // set open graph url
    // const ssrRequestReferer = (context.ssrContext && context.ssrContext.req) ? context.ssrContext.req.headers.referer : null
    // const locationHref = (typeof window !== 'undefined') ? window.location.href : null
    // const ogUrl = ssrRequestReferer || locationHref
    // store.commit('SEO/updateOgUrl', ogUrl)
    //
    // if (!to.meta?.hasDynamicSetting && !to.meta?.hasDynamicSettingWithParams) {
    //   return next()
    // }
    //
    // if (!context.ssrContext) {
    //   return next()
    // }
    //
    // try {
    //   const withParams = !!to.meta.hasDynamicSettingWithParams
    //   const params = JSON.stringify(to.params)
    //   const routeName = to.name
    //   const key = 'route_name:' + routeName + (withParams ? ('-params:' + params) : '')
    //   const pageSetting = await APIGateway.pageSetting.get(key)
    //   const sections = pageSetting.value.sections
    //   const seo = pageSetting.value.seo
    //
    //   // PageBuilder
    //   store.commit('PageBuilder/updateCurrentSections', sections)
    //
    //   // SEO
    //   store.commit('SEO/updateTitle', seo.title)
    //   store.commit('SEO/updateDescription', seo.description)
    //   store.commit('SEO/updateRobots', seo.robots)
    //   store.commit('SEO/updateOgTitle', seo.ogTitle)
    //   store.commit('SEO/updateOgDescription', seo.ogDescription)
    //   store.commit('SEO/updateOgUrl', seo.ogUrl)
    //   store.commit('SEO/updateOgImage', seo.ogImage)
    // } catch {
    //   store.commit('PageBuilder/updateCurrentSections', null)
    //   return next()
    // }
    return next()
  })
})
