import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Hashtag, HashtagList } from 'src/models/Hashtag.js'

export default class HashtagAPI extends APIRepository {
  constructor() {
    super('hashtags', appApi)
    this.APIAdresses = {
      base: '/cma/hashtags',
      byId: (id) => '/cma/hashtags/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Hashtag(response.data) },
      post: (response) => { return new Hashtag(response.data) },
      put: (response) => { return new Hashtag(response.data) },
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
          list: new HashtagList(results),
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
        return new Hashtag(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (title) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        title: null // String
      }, { title }),
      resolveCallback: (response) => {
        return new Hashtag(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
