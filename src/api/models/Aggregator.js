import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class AggregatorAPI extends APIRepository {
  constructor() {
    super('aggregator', appApi)
    this.APIAdresses = {
      statistics: '/rma/aggregator/statistics'
    }
    this.CacheList = {
      statistics: this.name + this.APIAdresses.statistics
    }
  }

  statistics() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.statistics,
      resolveCallback: (response) => {
        return {
          users_count: response.data.users_count, // کاربر فعال
          training_classrooms_count: response.data.training_classrooms_count, // دوره
          event_classrooms_count: response.data.event_classrooms_count // رویداد
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
