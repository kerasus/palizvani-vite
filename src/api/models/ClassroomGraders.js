import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class ClassroomGraderAPI extends APIRepository {
  constructor() {
    super('classroom_graders', appApi, '/lma/classroom_graders')
    this.APIAdresses = {
      base: '/lma/classroom_graders',
      byId: (id) => '/lma/classroom_graders/' + id,
      withLastPassedUnit: '/lma/classroom_graders/graders_with_last_passed_unit'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }
}
