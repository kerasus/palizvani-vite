import { appApi } from 'src/boot/axios.js'
import { User } from 'src/models/User.js'
import APIRepository from '../classes/APIRepository.js'

export default class AuthAPI extends APIRepository {
  constructor() {
    super('auth', appApi)
    this.APIAdresses = {
      login: '/auth/login',
      sendOtp: '/auth/send-otp',
      signUp: '/auth/sign-up',
      setPass: '/auth/set-pass',
      loginAdmin: '/auth/login',
      refreshToken: '/auth/refresh-token',
      changePass: '/auth/change-pass',
      loginOtp: '/auth/login-otp'
    }
    this.CacheList = {}
  }

  login (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      data: this.getNormalizedSendData({
        input: '', // String
        password: '' // String
      }, data),
      resolveCallback: (response) => {
        const accessToken = response.data.token.access_token
        const ca = accessToken
        const base64Url = ca.split('.')[1]
        const decodedValue = JSON.parse(window.atob(base64Url))
        const user = new User(decodedValue)

        return { accessToken, user }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
