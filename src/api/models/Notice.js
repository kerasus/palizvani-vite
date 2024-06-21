import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Notice, NoticeList } from 'src/models/Notice.js'

export default class NoticeAPI extends APIRepository {
  constructor() {
    super('ticket', appApi)
    this.APIAdresses = {
      base: '/mma/notices',
      myNotSeenNotificationsCount: '/mma/notices/my_not_seen_notifications_count',
      byId: (id) => '/mma/notices/' + id
    }
    this.restUrl = (id) => this.url + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Notice(response.data) },
      post: (response) => { return new Notice(response.data) },
      put: (response) => { return new Notice(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new NoticeList(results),
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

  myNotSeenNotificationsCount(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.myNotSeenNotificationsCount,
      resolveCallback: (response) => {
        return response.data.count // number
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  seen(id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(id),
      data: {
        state: 'READ'
      },
      resolveCallback: (response) => {
        return new Notice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
