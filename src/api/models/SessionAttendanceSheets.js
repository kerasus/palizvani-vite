import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { SessionAttendanceSheets, SessionAttendanceSheetsList } from 'src/models/SessionAttendanceSheets.js'

export default class SessionAttendanceSheetsAPI extends APIRepository {
  constructor() {
    super('session', appApi, '/lma/session_attendance_sheets', SessionAttendanceSheets)
    this.APIAdresses = {
      base: '/lma/session_attendance_sheets',
      submitAssignment: '/lma/session_attendance_sheets/submit_assignment',
      submitAttendanceStatus: '/lma/session_attendance_sheets/submit_attendance_status',
      byId: (id) => '/lma/project_attendance_sheets/' + id
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
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new SessionAttendanceSheetsList(results),
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
