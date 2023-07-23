import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class TeleMarketingAPI extends APIRepository {
  constructor() {
    super('teleMarketing', appApi)
    this.APIAdresses = {
      create: '/admin/user',
      edit: '/admin/user',
      index: '/admin/user',
      show: '/admin/user'
    }
  }
}
