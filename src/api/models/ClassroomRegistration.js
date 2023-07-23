import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ClassroomRegistration, ClassroomRegistrationList } from 'src/models/ClassroomRegistration.js'

export default class ClassroomRegistrationAPI extends APIRepository {
  constructor() {
    super('ClassroomRegistration', appApi, '/lma/registrations', ClassroomRegistration)
    this.APIAdresses = {
      base: '/lma/registrations',
      byId: (id) => '/lma/registrations/' + id
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
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ClassroomRegistrationList(results),
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
