import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ContentTopic, ContentTopicList } from 'src/models/ContentTopic.js'

export default class ContentTopicAPI extends APIRepository {
  constructor() {
    super('content-topic', appApi)
    this.APIAdresses = {
      base: '/cma/topics',
      byId: (id) => '/cma/topics/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new ContentTopic(response.data) },
      post: (response) => { return new ContentTopic(response.data) },
      put: (response) => { return new ContentTopic(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        content: null, // Number
        creator: null, // Number
        category: null, // Number
        tile: null, // String
        category__parent__parent: null, // Number
        category__in: null, // Number[]
        hashtags__id__in: null, // Number[]
        hashtags__in: null, // Number[]
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ContentTopicList(results),
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
