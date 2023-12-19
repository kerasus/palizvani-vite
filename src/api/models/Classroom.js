import { appApi } from 'src/boot/axios.js'
import { Invoice } from 'src/models/Invoice.js'
import APIRepository from '../classes/APIRepository.js'
import { Registration } from 'src/models/Registration.js'
import { Classroom, ClassroomList } from 'src/models/Classroom.js'

export default class ClassroomAPI extends APIRepository {
  constructor() {
    super('classrooms', appApi, '/lma/classrooms', Classroom)
    this.APIAdresses = {
      base: '/lma/classrooms',
      myAsGraderClassrooms: '/lma/classrooms/my_as_a_grader_classrooms',
      byId: (id) => '/lma/classrooms/' + id,
      enroll: (id) => '/lma/classrooms/' + id + '/enroll',
      drop: (id) => '/lma/classrooms/' + id + '/drop',
      register: (id) => '/lma/classrooms/' + id + '/register',
      leaders: (id) => '/lma/classrooms/' + id + '/leaders',
      members: '/lma/registrations',
      activitySheet: '/lma/registrations/activity_sheet',
      enrollByAdmin: (classroomId, userId) => '/lma/classrooms/' + classroomId + '/enrolll?user_id=' + userId,
      dropByAdmin: (classroomId) => '/lma/classrooms/' + classroomId + '/drop',
      createInvoice: (id) => '/lma/classrooms/' + id + '/create_invoice'
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
        unit__category__type: null, // String
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new ClassroomList(results),
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
        return new Classroom(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  register (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.register(id),
      resolveCallback: (response) => {
        const data = {
          type: null,
          model: response.data
        }
        if (response.data.status === 'PAYING') {
          data.type = 'Invoice'
          data.model = new Invoice(response.data)
        } else if (response.data.status === 'REGISTERED') {
          data.type = 'Registration'
          data.model = new Registration(response.data)
        }

        return data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  enrollByUser (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.enroll(id),
      resolveCallback: (response) => {
        return new Classroom(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  dropByUser (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.drop(id),
      resolveCallback: (response) => {
        return new Classroom(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  appendLeaders (data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.leaders(data.classroomId),
      data: {
        leaders: data.leaders // array of numbers
      },
      resolveCallback: (response) => {
        return new Classroom(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  dropByAdmin (classroomId, userId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.dropByAdmin(classroomId),
      data: {
        owner: userId
      },
      resolveCallback: (response) => {
        return new Classroom(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createInvoice (id) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.createInvoice(id),
      resolveCallback: (response) => {
        return new Invoice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createInvoiceByAdmin (classroomId, userId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.createInvoice(classroomId),
      data: { owner: userId },
      resolveCallback: (response) => {
        return new Invoice(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
