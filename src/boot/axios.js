import { boot } from 'quasar/wrappers'
import { Notify, Cookies } from 'quasar'
import APIInstanceWrapper from 'src/api/classes/APIInstanceWrapper.js'

const apiServer = process.env.APP_API
const apiServerTarget = process.env.APP_API_SERVER

// const apiV2Server = process.env.APP_API
// const apiV2ServerTarget = process.env.APP_API_SERVER
//
// const apiV1Server = process.env.ALAA_API_V1
// const apiV1ServerTarget = process.env.ALAA_API_V1_SERVER
// const webServer = process.env.ALAA_WEB
// const webServerTarget = process.env.ALAA_WEB_SERVER

const AxiosHooks = (function () {
  let $notify = null

  function setNotifyInstance($q) {
    if (!$q.notify) {
      return
    }
    $notify = $q.notify
  }

  function handleErrors (error, router, store) {
    const messages = []
    if (!error || !error.response) {
      return error // Reject in case of network errors
    }

    const statusCode = parseInt(error.response.status)

    if (statusCode >= 500 && statusCode <= 599) {
      messages.push('مشکلی رخ داده است. مجدد تلاش کنید.')
    } else if (statusCode === 404) {
      messages.push(error.response.data.detail || 'موردی یافت نشد.')
    } else if (statusCode === 401) {
      messages.push(error.response.data.detail || 'Unauthorized access.')
      deAuthorizeUser(router, store)
    } else if (statusCode === 403) {
      messages.push(error.response.data.detail || 'Forbidden access.')
    } else if (error.response.data) {
      // Handle other errors by iterating over response data
      if (error.response.data.detail) {
        messages.push(error.response.data.detail)
      } else {
        for (const key of Object.keys(error.response.data)) {
          const message = error.response.data[key]
          if (typeof message === 'string') {
            messages.push(`${key}: ${message}`)
          } else if (Array.isArray(message)) {
            message.forEach(msg => messages.push(`${key}: ${msg}`))
          }
        }
      }
    }

    toastMessages(messages)

    // Return the error to be handled by the calling function
    return error
  }

  function handleFulfilled (response) {
    if (
      // response.config.method === 'get' ||
      // response.config.method === 'GET' ||
      response.config.method === 'post' ||
      response.config.method === 'POST' ||
      response.config.method === 'put' ||
      response.config.method === 'PUT' ||
      response.config.method === 'delete' ||
      response.config.method === 'DELETE'
    ) {
      const message = 'با موفقیت انجام شد'
      if ($notify) {
        $notify({
          type: 'positive',
          message
        })
      } else {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 5000,
          position: 'top',
          message,
          icon: 'report_problem'
        })
      }
    }
  }

  function deAuthorizeUser(router, store) {
    // console.error('deAuthorizeUser')
    store.dispatch('Auth/logOut', { redirectTo: false, clearRedirectTo: false })
    const loginRouteName = 'Login'
    const currentRoute = (router?.currentRoute?._value) ? router.currentRoute._value : (router?.history?.current) ? router.history.current : null
    if (currentRoute && currentRoute.name === loginRouteName) {
      return
    }
    store.commit('Auth/updateRedirectTo', JSON.parse(JSON.stringify({ name: currentRoute.name, params: currentRoute.params, query: currentRoute.query })))
    // console.error('router', router)
    // console.error('loginRouteName', loginRouteName)
    router.push({ name: loginRouteName })
  }

  function toastMessages(messages) {
    messages.forEach((item) => {
      if ($notify) {
        $notify({
          type: 'negative',
          color: 'negative',
          message: item,
          icon: 'report_problem'
        })
      } else {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 5000,
          position: 'top',
          message: item,
          icon: 'report_problem'
        })
      }
    })
  }

  return {
    handleErrors,
    handleFulfilled,
    setNotifyInstance
  }
}())

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)

const appApi = APIInstanceWrapper.createInstance(apiServer, apiServerTarget)

export default boot(({ app, store, router, ssrContext }) => {
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  AxiosHooks.setNotifyInstance(app.config.globalProperties.$q)

  if (appApi.interceptors) {
    appApi.interceptors.response.use(function (response) {
      AxiosHooks.handleFulfilled(response)
      return response
    }, function (error) {
      AxiosHooks.handleErrors(error, router, store)
      return Promise.reject(error) // Ensure the error is rejected properly
    })
  }

  store.$axios = appApi
  router.$axios = appApi

  app.config.globalProperties.$axios = appApi

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const allCookies = cookies.getAll()
  const cookiesAccessTokenInCookies = cookies.get('BearerAccessToken') ? cookies.get('BearerAccessToken') : allCookies.BearerAccessToken
  // const cookiesAccessTokenInCookies = cookies.get('BearerAccessToken')
  const accessTokenInLocalStorage = store.getters['Auth/accessToken']
  const cookiesAccessToken = accessTokenInLocalStorage || cookiesAccessTokenInCookies

  if (cookiesAccessToken) {
    const tokenType = 'Bearer'
    store.$accessToken = cookiesAccessToken

    // const internalAxiosRequesConfig = (config) => {
    //   config.headers.Authorization = `${tokenType} ${cookiesAccessToken}`
    //   return config
    // }
    // const onRejectAxios = (error) => {
    //   return Promise.reject(error)
    // }
    //
    // appApi.interceptors.request.use(internalAxiosRequesConfig, onRejectAxios)

    appApi.defaults.headers.common.Authorization = tokenType + ' ' + cookiesAccessToken
    // apiV1.defaults.headers.common.Authorization = tokenType + ' ' + cookiesAccessToken
    // apiWeb.defaults.headers.common.Authorization = tokenType + ' ' + cookiesAccessToken
  } else {
    // console.error('axios boot->Auth/logOut')
    store.dispatch('Auth/logOut')
  }
})

export { appApi }
