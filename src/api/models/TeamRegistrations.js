import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class TeamAPI extends APIRepository {
  constructor() {
    super('teams', appApi, '/lma/teams')
    this.APIAdresses = {
      base: '/lma/team_registrations'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
  }
}
