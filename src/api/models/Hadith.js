import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Hadith, HadithList } from 'src/models/Hadith.js'

export default class HadithAPI extends APIRepository {
  constructor() {
    super('hadithes', appApi)
    this.APIAdresses = {
      base: '/cma/hadithes',
      byId: (id) => '/cma/hadithes/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Hadith(response.data) },
      post: (response) => { return new Hadith(response.data) },
      put: (response) => { return new Hadith(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        status: null, // String
        per_page: 10, // Number
        page: 1, // Number
        ordering: '-publish_date'
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new HadithList(results),
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
        return new Hadith(response.data)
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
        persian_text: null, // String
        arabian_text: null, // String
        narrator: null, // String
        source: null, // String
        publish_date: null // String
      }, data),
      resolveCallback: (response) => {
        return new Hadith(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
