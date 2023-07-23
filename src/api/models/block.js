import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class BlockAPI extends APIRepository {
  constructor() {
    super('block', appApi)
    this.APIAdresses = {
      blockManagement: {
        create: {
          base: '/admin/user'
        },
        edit: {
          base: '/admin/user/'
        },
        index: {
          base: '/admin/user'
        },
        show: {
          base: '/admin/user/'
        }
      }
    }
  }
}
