import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class SectionAPI extends APIRepository {
  constructor() {
    super('section', appApi)
    this.APIAdresses = {
      section: {
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
