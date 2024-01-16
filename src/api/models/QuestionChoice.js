import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { QuestionChoice, QuestionChoiceList } from 'src/models/QuestionChoice.js'

export default class QuestionChoiceAPI extends APIRepository {
  constructor() {
    super('question_choices', appApi, '/lma/question_choices', QuestionChoice)
    this.APIAdresses = {
      base: '/lma/question_choices',
      byId: (id) => '/lma/question_choices/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new QuestionChoice(response.data) },
      post: (response) => { return new QuestionChoice(response.data) },
      put: (response) => { return new QuestionChoice(response.data) },
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
          list: new QuestionChoiceList(results),
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
