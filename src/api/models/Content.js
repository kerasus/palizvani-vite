import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Content, ContentList } from 'src/models/Content.js'

export default class ContentAPI extends APIRepository {
  constructor() {
    super('content', appApi)
    this.APIAdresses = {
      base: '/cma/contents',
      byId: (id) => '/cma/contents/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      index: (filters) => this.name + this.APIAdresses.base + encodeURI(filters)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Content(response.data) },
      post: (response) => { return new Content(response.data) },
      put: (response) => { return new Content(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    const normalizedSendData = this.getNormalizedSendData({
      category: null, // Number
      per_page: 10, // Number
      page: 1 // Number
    }, data)
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.index(normalizedSendData),
      data: normalizedSendData,
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ContentList(results),
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
        return new Content(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
