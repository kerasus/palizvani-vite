import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class TagAPI extends APIRepository {
  constructor() {
    super('tag', appApi)
    this.APIAdresses = {
      create: '/admin/user',
      edit: '/admin/user',
      index: '/admin/user',
      show: '/admin/user'
    }
  }
}
