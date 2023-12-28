import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { AnswerBook, AnswerBookList } from 'src/models/AnswerBook.js'

export default class AnswerBookAPI extends APIRepository {
  constructor() {
    super('answer_books', appApi)
    this.APIAdresses = {
      base: '/lma/answer_books',
      getOrCreate: '/lma/answer_books/get_or_create',
      byId: (id) => '/lma/answer_books/' + id,
      confirmAnswers: (id) => '/lma/answer_books/' + id + '/confirm_answers',
      confirmScores: (id) => '/lma/answer_books/' + id + '/confirm_scores',
      confirmUngradable: (id) => '/lma/answer_books/' + id + '/confirm_ungradable',
      setGraderToMe: (id) => '/lma/answer_books/' + id + '/set_grader_to_me',
      submitObjectionResult: (id) => '/lma/answer_books/' + id + '/submit_objection_result',
      submitObjectionRequest: (id) => '/lma/answer_books/' + id + '/submit_objection_request',
      getTestQuestions: (id) => '/lma/answer_books/' + id + '/get_test_questions',
      submitOverallAnswer: (id) => '/lma/answer_books/' + id + '/submit_overall_answer'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id),
      getTestQuestions: (id) => this.name + this.APIAdresses.getTestQuestions(id)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new AnswerBook(response.data) },
      post: (response) => { return new AnswerBook(response.data) },
      put: (response) => { return new AnswerBook(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        test__classroom: null, // Number
        owner: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new AnswerBookList(results),
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
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrCreate (userId, testId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.getOrCreate,
      data: {
        owner: userId,
        test: testId
      },
      resolveCallback: (response) => {
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getTestQuestions (id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getTestQuestions(id),
      resolveCallback: (response) => {
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  confirmAnswers (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.confirmAnswers(id),
      resolveCallback: (response) => {
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  confirmScores (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.confirmScores(id),
      resolveCallback: (response) => {
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  confirmUngradable (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.confirmUngradable(id),
      resolveCallback: (response) => {
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setGraderToMe (answerBookId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.setGraderToMe(answerBookId),
      resolveCallback: (response) => {
        return new AnswerBook(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
