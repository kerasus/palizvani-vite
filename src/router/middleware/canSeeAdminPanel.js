/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  // const user = store.getters['Auth/user']
  // if (!user.canSeeAdminPanel()) {
  //   return next({ name: 'Public.Home' })
  // }
  return next()
}
