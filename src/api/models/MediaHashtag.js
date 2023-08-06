import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { MediaHashtag, MediaHashtagList } from 'src/models/MediaHashtag.js'

export default class MediaHashtagAPI extends APIRepository {
  constructor() {
    super('mediaHashtag', appApi)
    this.APIAdresses = {
      base: '/cma/hashtags'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new MediaHashtag(response.data) },
      post: (response) => { return new MediaHashtag(response.data) },
      put: (response) => { return new MediaHashtag(response.data) },
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
          list: new MediaHashtagList(results),
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
