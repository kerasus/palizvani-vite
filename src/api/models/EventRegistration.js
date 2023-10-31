import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Registration, RegistrationList } from 'src/models/Registration.js'

export default class EventRegistrationAPI extends APIRepository {
  constructor() {
    super('registrations', appApi, '/ema/registrations', Registration)
    this.APIAdresses = {
      base: '/ema/registrations',
      exportReport: '/ema/registrations/export_report',
      classroomDetail: (registrationId) => '/ema/registrations/' + registrationId + '/classroom_detail',
      byId: (id) => '/ema/registrations/' + id
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
        classroom: null, // Number
        owner: null, // Number
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new RegistrationList(results),
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

  exportReport(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.exportReport,
      data: this.getNormalizedSendData({
        classroom: null, // Number
        type: null, // String
        status: null // String
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
