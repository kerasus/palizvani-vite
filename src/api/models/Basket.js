import { appApi } from 'src/boot/axios.js'
import { Invoice } from 'src/models/Invoice.js'
import APIRepository from '../classes/APIRepository.js'
import { Basket, BasketList } from 'src/models/Basket.js'

export default class BasketAPI extends APIRepository {
  constructor() {
    super('package', appApi)
    this.APIAdresses = {
      base: '/store/baskets',
      checkoutReview: '/store/baskets/checkout_review',
      listOrders: '/store/baskets/list_orders',
      byId: (id) => '/store/baskets/' + id,
      send: (id) => '/store/baskets/' + id + '/send',
      createInvoice: (id) => '/store/baskets/' + id + '/create_invoice',
      submitDiscountCode: (id) => '/store/baskets/' + id + '/submit_discount_code',
      removeDiscountCode: (id) => '/store/baskets/' + id + '/remove_discount_code'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Basket(response.data) },
      post: (response) => { return new Basket(response.data) },
      put: (response) => { return new Basket(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        category: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new BasketList(results),
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

  listOrders(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.listOrders,
      data: this.getNormalizedSendData({
        category: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new BasketList(results),
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

  get (id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.byId(id),
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  checkoutReview () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.checkoutReview,
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setAddress (basketId, addressData) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(basketId),
      data: this.getNormalizedSendData({
        province: null, // String
        city: null, // String
        address: null, // String
        postal_code: null // String
      }, addressData),
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  submitDiscountCode (basketId, code) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.submitDiscountCode(basketId),
      data: this.getNormalizedSendData({
        code: null // String
      }, { code }),
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  removeDiscountCode (basketId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.removeDiscountCode(basketId),
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  send (basketId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.send(basketId),
      resolveCallback: (response) => {
        return new Basket(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createInvoice (basketId, owner) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.createInvoice(basketId),
      data: this.getNormalizedSendData({
        owner: null // String
      }, { owner }),
      resolveCallback: (response) => {
        return new Invoice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
