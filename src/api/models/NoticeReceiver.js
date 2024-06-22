import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { NoticeReceiver, NoticeReceiverList } from 'src/models/NoticeReceiver.js'

export default class NoticeReceiverAPI extends APIRepository {
  constructor() {
    super('ticket', appApi)
    this.APIAdresses = {
      base: '/mma/notice_receivers',
      myNotSeenNotificationsCount: '/mma/notice_receivers/my_not_seen_notifications_count',
      byId: (id) => '/mma/notice_receivers/' + id,
      readNotification: (id) => '/mma/notice_receivers/' + id + '/read'
    }
    this.restUrl = (id) => this.url + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new NoticeReceiver(response.data) },
      post: (response) => { return new NoticeReceiver(response.data) },
      put: (response) => { return new NoticeReceiver(response.data) },
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
          list: new NoticeReceiverList(results),
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
      request: this.APIAdresses.readNotification(id),
      data: {

      },
      resolveCallback: (response) => {
        return new NoticeReceiver(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
