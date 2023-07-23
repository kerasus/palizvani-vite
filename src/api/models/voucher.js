import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class VoucherAPI extends APIRepository {
  constructor() {
    super('voucher', appApi)
    this.APIAdresses = {
      Vouchers: {
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
