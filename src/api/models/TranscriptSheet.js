import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class TranscriptSheetAPI extends APIRepository {
  constructor() {
    super('transcript_sheets', appApi)
    this.APIAdresses = {
      base: '/lma/transcript_sheets',
      exportReport: '/lma/transcript_sheets/export_report',
      byId: (id) => '/lma/transcript_sheets/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
  }

  notifyAnnounceResult (data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.announceResult(data.classroomId),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  deleteById (transcriptSheetId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.byId(transcriptSheetId),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  update (transcriptSheetId, data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(transcriptSheetId),
      data,
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  exportReport(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.exportReport,
      data: this.getNormalizedSendData({
        registration__classroom: null, // Number
        page: null // Number
      }, data),
      responseType: 'blob',
      resolveCallback: (response) => {
        return response.data // xlsxData
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
