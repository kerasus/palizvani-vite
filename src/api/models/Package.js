import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Package, PackageList } from 'src/models/Package.js'

export default class PackageAPI extends APIRepository {
  constructor() {
    super('package', appApi)
    this.APIAdresses = {
      base: '/store/packages',
      byId: (id) => '/store/packages/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Package(response.data) },
      post: (response) => { return new Package(response.data) },
      put: (response) => { return new Package(response.data) },
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
          list: new PackageList(results),
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
        return new Package(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  add (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        store_category: null, // Number
        content_category: null, // Number
        inventory: 0, // Number
        unit_price: 0, // Number
        discount_percent: 0, // Number
        maximum_order_count: 0, // Number
        weight: 0, // Number
        thumbnail: null, // String
        title: null, // String
        description: null, // String
        specification: null, // String
        products: [], // Array of Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return new Package(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
