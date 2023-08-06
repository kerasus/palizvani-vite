import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ContentCategory, ContentCategoryList } from 'src/models/ContentCategory.js'

export default class ContentCategoryAPI extends APIRepository {
  constructor() {
    super('content-category', appApi)
    this.APIAdresses = {
      base: '/cma/contents/categories',
      byId: (id) => '/cma/contents/categories/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new ContentCategory(response.data) },
      post: (response) => { return new ContentCategory(response.data) },
      put: (response) => { return new ContentCategory(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        parent__isnull: null, // String (true, false)
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ContentCategoryList(results),
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
}
