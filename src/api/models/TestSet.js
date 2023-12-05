import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { TestSet, TestSetList } from 'src/models/TestSet.js'

export default class TestSetAPI extends APIRepository {
  constructor() {
    super('test_sets', appApi)
    this.APIAdresses = {
      base: '/lma/test_sets',
      byId: (id) => '/lma/test_sets/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new TestSet(response.data) },
      post: (response) => { return new TestSet(response.data) },
      put: (response) => { return new TestSet(response.data) },
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
          list: new TestSetList(results),
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
        return new TestSet(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
