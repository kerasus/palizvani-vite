import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ProjectAttendanceSheets, ProjectAttendanceSheetsList } from 'src/models/ProjectAttendanceSheets.js'

export default class ProjectAttendanceSheetsAPI extends APIRepository {
  constructor() {
    super('project_attendance_sheets', appApi, '/lma/project_attendance_sheets', ProjectAttendanceSheets)
    this.APIAdresses = {
      base: '/lma/project_attendance_sheets',
      project_sheets: '/lma/project_attendance_sheets/project_sheets',
      byId: (id) => '/lma/project_attendance_sheets/' + id,
      verify: (id) => '/lma/project_attendance_sheets/' + id + '/verify',
      notVerify: (id) => '/lma/project_attendance_sheets/' + id + '/not_verify'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }

  index (data) {
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

  projectSheets (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.project_sheets,
      data: this.getNormalizedSendData({
        project: null, // Number
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

  verify (projectAttendanceSheetsId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.verify(projectAttendanceSheetsId),
      resolveCallback: (response) => {
        return new ProjectAttendanceSheets(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  notVerify (projectAttendanceSheetsId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.notVerify(projectAttendanceSheetsId),
      resolveCallback: (response) => {
        return new ProjectAttendanceSheets(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
