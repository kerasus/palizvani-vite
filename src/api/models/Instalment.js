import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Instalment, InstalmentList } from 'src/models/Instalment.js'

export default class InstalmentAPI extends APIRepository {
  constructor() {
    super('instalment', appApi)
    this.APIAdresses = {
      base: '/accounting/instalments',
      byId: (id) => '/accounting/instalments/' + id,
      pay: (id) => '/accounting/instalments/' + id + '/pay'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Instalment(response.data) },
      post: (response) => { return new Instalment(response.data) },
      put: (response) => { return new Instalment(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        type: null, // String -> overdue - ...
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new InstalmentList(results),
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

  pay(instalmentId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.pay(instalmentId),
      resolveCallback: (response) => {
        return response.data.detail // String : message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
