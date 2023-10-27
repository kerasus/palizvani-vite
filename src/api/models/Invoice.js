import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Invoice, InvoiceList } from 'src/models/Invoice.js'

export default class InvoiceAPI extends APIRepository {
  constructor() {
    super('invoice', appApi, '/accounting/invoices', Invoice)
    this.APIAdresses = {
      base: '/accounting/invoices',
      byId: (id) => '/accounting/invoices/' + id,
      pay: (id) => '/accounting/invoices/' + id + '/pay',
      cancel: (id) => '/accounting/invoices/' + id + '/cancel'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Invoice(response.data) },
      post: (response) => { return new Invoice(response.data) },
      put: (response) => { return new Invoice(response.data) },
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
          list: new InvoiceList(results),
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

  pay(invoiceId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.pay(invoiceId),
      resolveCallback: (response) => {
        return response.data.detail // String : message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  cancel(invoiceId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.cancel(invoiceId),
      resolveCallback: (response) => {
        return response.data.detail // String : message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createService (products = []) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: {
        type: 'SERVICE', // String
        products // Array of Object
      },
      resolveCallback: (response) => {
        return new Invoice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createBasket (basketType, basketId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: {
        type: basketType.toUpperCase(), // String
        products: [
          {
            product_type: basketType + '_basket',
            product_id: basketId,
            count: 1
          }
        ]
      },
      resolveCallback: (response) => {
        return new Invoice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (type, products = []) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: {
        type, // String
        products // Array of Object
      },
      resolveCallback: (response) => {
        return new Invoice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
