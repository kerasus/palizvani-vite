import { User } from 'src/models/User.js'
import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', appApi, '/user', User)
    this.APIAdresses = {
      base: '/uma/users',
      verify: '/uma/users/verify',
      current: '/uma/users/current',
      byId: (id) => '/uma/users/' + id,
      changeRole: (id) => '/uma/users/' + id + '/change_role'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      current: this.name + this.APIAdresses.current,
      verify: this.name + this.APIAdresses.verify,
      byId: (id) => this.name + this.APIAdresses.byId(id),
      changeRole: (id) => this.name + this.APIAdresses.changeRole(id)
    }
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
        has_seminary_education: false, // Boolean
        last_academic_degree: 'UNDER_DIPLOMA', // String
        last_academic_degree_field: null, // String
        last_academy_name: null, // String
        educational_status: null, // String
        phone_number: null, // String
        on_social_network_mobile_number: null, // String
        on_call_mobile_number: null, // String
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
