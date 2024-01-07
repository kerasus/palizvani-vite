import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { SessionTemplate, SessionTemplateList } from 'src/models/SessionTemplate.js'

export default class SessionTemplateAPI extends APIRepository {
  constructor() {
    super('SessionTemplate', appApi, '/lma/categories', SessionTemplate)
    this.APIAdresses = {
      base: '/lma/session_templates',
      byId: (id) => '/lma/session_templates/' + id,
      appendQuestion: (id) => '/lma/session_templates/' + id + '/append_question'
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
        unit: null, // Number
        category: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new SessionTemplateList(results),
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
        return new SessionTemplate(response.data)
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
        unit: null // Number
      }, data),
      resolveCallback: (response) => {
        return new SessionTemplate(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
