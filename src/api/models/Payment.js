import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Payment, PaymentList } from 'src/models/Payment.js'

export default class PaymentAPI extends APIRepository {
  constructor() {
    super('invoice', appApi)
    this.APIAdresses = {
      base: '/accounting/payments',
      requestWithdraw: '/accounting/payments/request_withdraw',
      byId: (id) => '/accounting/payments/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Payment(response.data) },
      post: (response) => { return new Payment(response.data) },
      put: (response) => { return new Payment(response.data) },
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
          list: new PaymentList(results),
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

  requestWithdraw(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.requestWithdraw,
      data: this.getNormalizedSendData({
        IBAN: null, // String
        amount: null // Number
      }, data),
      resolveCallback: (response) => {
        return new Payment(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
