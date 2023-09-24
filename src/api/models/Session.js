import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Session, SessionList } from 'src/models/Session.js'

export default class SessionAPI extends APIRepository {
  constructor() {
    super('Session', appApi, '/lma/categories', Session)
    this.APIAdresses = {
      base: '/lma/sessions',
      byId: (id) => '/lma/sessions/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        category: null, // Number
        classroom: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new SessionList(results),
          paginate
          // {
          //   "count": 1,
          //   "num_pages": 1,
          //   "per_page": 10,
          //   "current": 1,
          //   "next": null,
          //   "previous": null,
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        title: null, // String
        classroom: null, // Number
        unit: null // Number
      }, data),
      resolveCallback: (response) => {
        return new Session(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
