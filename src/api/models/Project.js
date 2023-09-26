import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Project, ProjectList } from 'src/models/Project.js'

export default class ProjectAPI extends APIRepository {
  constructor() {
    super('project', appApi, '/lma/projects', Project)
    this.APIAdresses = {
      base: '/lma/projects',
      attendanceSheetsList: '/lma/projects/attendance_sheets',
      byId: (id) => '/lma/projects/' + id,
      projectAndCurrentUserAttendanceSheet: (id) => '/lma/projects/' + id + '/project_and_current_user_attendance_sheet',
      attendanceSheets: (id) => '/lma/projects/' + id + '/attendance_sheets'
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
          list: new ProjectList(results),
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

  attendanceSheetsList (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.attendanceSheetsList,
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
          list: new ProjectList(results),
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
        return new Project(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
