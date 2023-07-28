import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Wallet, WalletList } from 'src/models/Wallet.js'

export default class WalletAPI extends APIRepository {
  constructor() {
    super('wallets', appApi)
    this.APIAdresses = {
      base: '/accounting/wallets',
      deposit: '/accounting/wallets/deposit'
    }
    this.restUrl = (id) => this.url + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Wallet(response.data) },
      post: (response) => { return new Wallet(response.data) },
      put: (response) => { return new Wallet(response.data) },
      delete: (response) => { return response.data }
    })
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        owner: null, // Number
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        const paginate = response.data
        const results = response.data.results
        delete paginate.results
        return {
          list: new WalletList(results),
          paginate
          // {
          //   "count": 1,
          //   "num_pages": 1,
          //   "per_page": 10,
          //   "current": 1,
          //   "next": null,
          //   "previous": null,
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  deposit(data) {
    const amount = data.amount ? data.amount * 10 : 0
    const invoice = data.invoice ? data.invoice : null
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.deposit,
      data: { amount, invoice },
      resolveCallback: (response) => {
        return response.data.url // String -> redirect url // thankyou
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getMyWallet (userId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: { owner: userId },
      resolveCallback: (response) => {
        return new Wallet(response.data.results[0])
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
