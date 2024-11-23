import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  const setVars = (user, accessToken) => {
    context.commit('updateUser', user)
    context.commit('updateAccessToken', accessToken)
    if (typeof window !== 'undefined') {
      Cookies.set('BearerAccessToken', accessToken, {
        // domain: '.' + window.location.host,
        path: '/',
        expires: '365d'
      })
    }
    // const tokenType = 'Bearer'
    // this.$accessToken = accessToken
    // this.$axios.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    // this.$apiV1.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    // this.$apiV2.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    // this.$apiWeb.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    context.commit('updateAxiosAuthorization', accessToken)
  }
  return new Promise((resolve, reject) => {
    APIGateway.auth.login(data)
      .then(({ user, accessToken }) => {
        setVars(user, accessToken)
        context.commit('updateUser', user)
        resolve({ accessToken, user })
      })
      .catch(() => {
        reject()
      })
  })
}

export function signUp (context, data) {
  const setVars = (user, accessToken) => {
    context.commit('updateUser', user)
    context.commit('updateAccessToken', accessToken)
    if (typeof window !== 'undefined') {
      Cookies.set('BearerAccessToken', accessToken, {
        // domain: '.' + window.location.host,
        path: '/',
        expires: '365d'
      })
    }
    context.commit('updateAxiosAuthorization', accessToken)
  }
  return new Promise((resolve, reject) => {
    APIGateway.auth.signUp(data)
      .then(({ user, accessToken }) => {
        setVars(user, accessToken)
        context.commit('updateUser', user)
        resolve({ accessToken, user })
      })
      .catch(() => {
        reject()
      })
  })
}

export function setPassword (context, data) {
  const setVars = (user, accessToken) => {
    context.commit('updateUser', user)
    context.commit('updateAccessToken', accessToken)
    if (typeof window !== 'undefined') {
      Cookies.set('BearerAccessToken', accessToken, {
        // domain: '.' + window.location.host,
        path: '/',
        expires: '365d'
      })
    }
    context.commit('updateAxiosAuthorization', accessToken)
  }
  return new Promise((resolve, reject) => {
    APIGateway.auth.setPassword(data)
      .then(({ user, accessToken }) => {
        setVars(user, accessToken)
        context.commit('updateUser', user)
        resolve({ accessToken, user })
      })
      .catch(() => {
        reject()
      })
  })
}

export function logOut (context, payload) {
  const redirectTo = payload?.redirectTo
  const clearRedirectTo = payload?.clearRedirectTo
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  context.commit('Shop/clearBasket', null, { root: true })
  if (typeof window !== 'undefined') {
    Cookies.set('BearerAccessToken', '', {
      // domain: '.' + window.location.host,
      path: '/'
      // expires: '365d'
    })
  }
  context.commit('updateAxiosAuthorization', null)
  // this.$accessToken = null
  // this.$axios.defaults.headers.common.Authorization = null
  // this.$apiV1.defaults.headers.common.Authorization = null
  // this.$apiV2.defaults.headers.common.Authorization = null
  // this.$apiWeb.defaults.headers.common.Authorization = null
  if (typeof clearRedirectTo === 'undefined' || clearRedirectTo === true) {
    context.commit('updateRedirectTo', null)
  }
  if (typeof redirectTo === 'undefined' || redirectTo === true) {
    this.$router.push({ name: 'Login' })
  }
}

export function updateCurrent (context) {
  return new Promise((resolve, reject) => {
    APIGateway.user.getCurrent()
      .then((user) => {
        context.commit('updateUser', user)
      })
      .catch(() => {
        reject()
      })
  })
}
