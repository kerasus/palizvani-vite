/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  // const user = store.getters['Auth/user']
  // if (user.id !== null && !user.canSeeUserProfilePanel() && user.canSeeAdminPanel()) {
  //   return next({ name: 'Admin.User.Index' })
  // } else if (user.id !== null && !user.canSeeUserProfilePanel() && !user.canSeeAdminPanel()) {
  //   return next({ name: 'NotFound' })
  // }
  return next()
}
