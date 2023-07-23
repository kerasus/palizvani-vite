/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  if (store.getters['Auth/accessToken']) {
    const user = store.getters['Auth/user']
    if (user.canSeeAdminPanel()) {
      return next({ name: 'Admin.User.Index' })
    }
    return next({ name: 'Public.Home' })
  }
  return next()
}
