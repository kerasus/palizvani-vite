import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Unit, UnitList } from 'src/models/Unit.js'

export default class UnitAPI extends APIRepository {
  constructor() {
    super('Unit', appApi, '/lma/categories', Unit)
    this.APIAdresses = {
      base: '/lma/units',
      byId: (id) => '/lma/units/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        category: null, // Number
        category__type: null, // String
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new UnitList(results),
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
        return new Unit(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        title: null, // String
        category: null, // Number
        default_session_count: null, // Number
        prerequisites: [] // Array
      }, data),
      resolveCallback: (response) => {
        return new Unit(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
