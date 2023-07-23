import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class SlideShowAPI extends APIRepository {
  constructor() {
    super('slideShow', appApi)
    this.APIAdresses = {
      slideShowManagement: {
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
