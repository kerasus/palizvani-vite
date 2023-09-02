import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default async function HasOverdueInstalment ({ next, store, to }) {
  const user = await APIGateway.user.getCurrent()
  store.commit('Auth/updateUser', user)

  if ((new User(user)).has_overdue_instalment) {
    store.commit('Auth/updateRedirectTo', { name: to.name, params: to.params, query: to.query })
    return next({ name: 'UserPanel.Profile.OverdueInstalments' })
  }

  return next()
}
