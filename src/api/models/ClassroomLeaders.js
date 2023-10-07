import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class ClassroomLeaderAPI extends APIRepository {
  constructor() {
    super('classroom_leaders', appApi, '/lma/classroom_leaders')
    this.APIAdresses = {
      base: '/lma/classroom_leaders',
      byId: (id) => '/lma/classroom_leaders/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }
}
