import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { BasketItem, BasketItemList } from 'src/models/BasketItem.js'

export default class BasketItemAPI extends APIRepository {
  constructor() {
    super('package', appApi)
    this.APIAdresses = {
      base: '/store/items',
      decrement: '/store/items/decrement',
      increment: '/store/items/increment',
      byId: (id) => '/store/items/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new BasketItem(response.data) },
      post: (response) => { return new BasketItem(response.data) },
      put: (response) => { return new BasketItem(response.data) },
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
          list: new BasketItemList(results),
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
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  remove (id) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.byId(id),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  addProduct (productId, count) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        product: null, // Number
        count: null // Number
      }, {
        product: parseInt(productId),
        count
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  addPackage (packageId, count) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        package: null, // Number
        count: null // Number
      }, {
        package: packageId,
        count
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  decrementPackage (packageId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.decrement,
      data: this.getNormalizedSendData({
        package: null // Number
      }, {
        package: packageId
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  decrementProduct (productId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.decrement,
      data: this.getNormalizedSendData({
        product: null // Number
      }, {
        product: productId
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  incrementPackage (packageId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.increment,
      data: this.getNormalizedSendData({
        package: null // Number
      }, {
        package: packageId
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  incrementProduct (productId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.increment,
      data: this.getNormalizedSendData({
        product: null // Number
      }, {
        product: productId
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  update (basketItemId, count) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(basketItemId),
      data: this.getNormalizedSendData({
        count: null // Number
      }, {
        count
      }),
      resolveCallback: (response) => {
        return new BasketItem(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
