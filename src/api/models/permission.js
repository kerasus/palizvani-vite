import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class PermissionAPI extends APIRepository {
  constructor() {
    super('permission', appApi)
    this.APIAdresses = {
      create: '/admin/user',
      edit: '/admin/user',
      index: '/admin/user',
      show: '/admin/user'
    }
  }
}
