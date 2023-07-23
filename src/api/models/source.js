import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class SourceAPI extends APIRepository {
  constructor() {
    super('source', appApi)
    this.APIAdresses = {
      sourceManagement: {
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
