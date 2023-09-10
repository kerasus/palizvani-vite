import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ProjectAttendanceSheets, ProjectAttendanceSheetsList } from 'src/models/ProjectAttendanceSheets.js'

export default class ProjectAttendanceSheetsAPI extends APIRepository {
  constructor() {
    super('project', appApi, '/lma/projects', ProjectAttendanceSheets)
    this.APIAdresses = {
      base: '/lma/project_attendance_sheets',
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
          list: new ProjectAttendanceSheetsList(results),
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
