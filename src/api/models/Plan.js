import APIRepository from '../classes/APIRepository'
import { appApi } from 'src/boot/axios'

export default class PlanAPI extends APIRepository {
  constructor() {
    super('plan', appApi, '/plan')
    this.APIAdresses = {
      plan: '/plan'
    }
    /* Setting the callback functions for the CRUD operations. */
    // this.setCrudCallbacks({
    //   get: (response) => { return new User(response.data.data)},
    //   post: (response) => { return new User(response.data.data)},
    //   put: (response) => { return new User(response.data.data)},
    //   delete: (response) => { return new User(response.data.data)}
    // })
  }
}
