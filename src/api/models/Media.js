import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Media, MediaList } from 'src/models/Media.js'

export default class MediaAPI extends APIRepository {
  constructor() {
    super('media', appApi)
    this.APIAdresses = {
      base: '/cma/medias',
      assignService: (id) => '/core/packages/' + id + '/assign'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Media(response.data) },
      post: (response) => { return new Media(response.data) },
      put: (response) => { return new Media(response.data) },
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
          list: new MediaList(results),
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
