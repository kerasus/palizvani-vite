import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class TeamAPI extends APIRepository {
  constructor() {
    super('teams', appApi, '/lma/teams')
    this.APIAdresses = {
      base: '/lma/teams',
      byId: (id) => '/lma/teams/' + id,
      registrations: (id) => '/lma/teams/' + id + '/registrations'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }

  appendRegistrations (data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.registrations(data.teamId),
      data: {
        registrations: data.registrations // array of numbers
      },
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
