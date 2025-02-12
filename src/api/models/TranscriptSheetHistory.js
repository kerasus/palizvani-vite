import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { TranscriptSheetHistory, TranscriptSheetHistoryList } from 'src/models/TranscriptSheetHistory.js'

export default class TranscriptSheetHistoryAPI extends APIRepository {
  constructor() {
    super('TranscriptSheetHistory', appApi, '/lma/categories', TranscriptSheetHistory)
    this.APIAdresses = {
      base: '/lma/transcript_sheet_histories',
      byId: (id) => '/lma/transcript_sheet_histories/' + id,
      appendQuestion: (id) => '/lma/transcript_sheet_histories/' + id + '/append_question'
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
          list: new TranscriptSheetHistoryList(results),
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
        return new TranscriptSheetHistory(response.data)
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
        return new TranscriptSheetHistory(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
