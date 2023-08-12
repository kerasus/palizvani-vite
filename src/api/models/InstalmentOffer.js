import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { InstalmentOffer, InstalmentOfferList } from 'src/models/InstalmentOffer.js'

export default class InstalmentOfferAPI extends APIRepository {
  constructor() {
    super('invoice', appApi)
    this.APIAdresses = {
      base: '/accounting/instalment_offers',
      byId: (id) => '/accounting/instalment_offers/' + id,
      accept: (id) => '/accounting/instalment_offers/' + id + '/accept',
      reject: (id) => '/accounting/instalment_offers/' + id + '/reject'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new InstalmentOffer(response.data) },
      post: (response) => { return new InstalmentOffer(response.data) },
      put: (response) => { return new InstalmentOffer(response.data) },
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
          list: new InstalmentOfferList(results),
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

  accept(id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.accept(id),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  reject(id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.reject(id),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
