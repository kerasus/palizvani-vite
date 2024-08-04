import { appApi } from 'src/boot/axios.js'
import { User, UserList } from 'src/models/User.js'
import APIRepository from '../classes/APIRepository.js'

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', appApi, '/uma/users', User)
    this.APIAdresses = {
      base: '/uma/users',
      professors: '/uma/users/professors',
      exportReport: '/uma/users/export_report',
      verify: '/uma/users/verify',
      current: '/uma/users/current',
      byId: (id) => '/uma/users/' + id,
      changeRole: (id) => '/uma/users/' + id + '/change_role',
      unassignedGradersWithLastPassedUnit: '/uma/users/unassigned_graders_with_last_passed_unit',
      unassignedLeadersWithLastPassedUnit: '/uma/users/unassigned_leaders_with_last_passed_unit'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      current: this.name + this.APIAdresses.current,
      verify: this.name + this.APIAdresses.verify,
      byId: (id) => this.name + this.APIAdresses.byId(id),
      changeRole: (id) => this.name + this.APIAdresses.changeRole(id)
    }
    this.restUrl = (id) => this.APIAdresses.byId(id)
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data) },
      post: (response) => { return new User(response.data) },
      put: (response) => { return new User(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        role: null, // String
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new UserList(results),
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

  professors(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.professors,
      data: this.getNormalizedSendData({
        per_page: 10, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new UserList(results),
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
      data,
      responseType: 'blob',
      resolveCallback: (response) => {
        return response.data // xlsxData
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updateCurrent(data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.current,
      data: this.getNormalizedSendData({
        firstname: '', // String
        lastname: '', // String
        gender: 'MALE', // String
        marital_status: 'UNKNOWN', // String
        birthdate: null, // String
        national_code: '', // String
        has_seminary_education: false, // Boolean
        last_academic_degree: 'UNDER_DIPLOMA', // String
        last_academic_degree_field: null, // String
        last_academy_name: null, // String
        educational_status: null, // String
        phone_number: null, // String
        on_social_network_mobile_number: null, // String
        on_call_mobile_number: null, // String
        mobile_number: null, // String
        email: '', // String
        is_abroad_birth_address: 'False', // String
        is_abroad_living_address: 'False', // String
        birth_country: 'ایران', // String
        living_country: 'ایران', // String
        birth_province: null, // String
        living_province: null, // String
        birth_city: null, // String
        living_city: null, // String
        living_address: null, // String
        living_postal_code: null, // String
        living_address_additional_info: null // String
      }, data),
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getCurrent() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.current,
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updateByAdmin(data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(data.id),
      data: this.getNormalizedSendData({
        firstname: '', // String
        lastname: '', // String
        gender: 'MALE', // String
        marital_status: 'UNKNOWN', // String
        birthdate: null, // String
        national_code: '', // String
        is_active: false, // Boolean
        has_seminary_education: false, // Boolean
        last_academic_degree: 'UNDER_DIPLOMA', // String
        last_academic_degree_field: null, // String
        last_academy_name: null, // String
        educational_status: null, // String
        phone_number: null, // String
        on_social_network_mobile_number: null, // String
        mobile_number: null, // String
        email: '', // String
        is_abroad_birth_address: 'False', // String
        is_abroad_living_address: 'False', // String
        birth_country: 'ایران', // String
        living_country: 'ایران', // String
        birth_province: null, // String
        living_province: null, // String
        birth_city: null, // String
        living_city: null, // String
        living_address: null, // String
        living_postal_code: null, // String
        living_address_additional_info: null // String
      }, data),
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
