import { appApi } from 'src/boot/axios.js'
import { Invoice } from 'src/models/Invoice.js'
import APIRepository from '../classes/APIRepository.js'
import { Event, EventList } from 'src/models/Event.js'

export default class EventAPI extends APIRepository {
  constructor() {
    super('events', appApi, '/ema/event', Event)
    this.APIAdresses = {
      base: '/ema/events',
      byId: (id) => '/ema/events/' + id,
      enroll: (id) => '/ema/events/' + id + '/enroll',
      drop: (id) => '/ema/events/' + id + '/drop',
      members: '/ema/registrations',
      activitySheet: '/ema/registrations/activity_sheet',
      enrollByAdmin: (classroomId, userId) => '/ema/events/' + classroomId + '/enrolll?user_id=' + userId,
      dropByAdmin: (classroomId) => '/ema/events/' + classroomId + '/drop',
      createInvoice: (id) => '/ema/events/' + id + '/create_invoice'
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
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new EventList(results),
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
        return new Event(response.data)
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
        return new Event(response.data)
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
        return new Event(response.data)
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
        return new Event(response.data)
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
