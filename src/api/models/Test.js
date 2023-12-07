import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Test, TestList } from 'src/models/Test.js'

export default class TestAPI extends APIRepository {
  constructor() {
    super('tests', appApi)
    this.APIAdresses = {
      base: '/lma/tests',
      byId: (id) => '/lma/tests/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Test(response.data) },
      post: (response) => { return new Test(response.data) },
      put: (response) => { return new Test(response.data) },
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
          list: new TestList(results),
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

  get(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.byId(id),
      resolveCallback: (response) => {
        return new Test(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
