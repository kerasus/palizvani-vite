import { appApi } from 'src/boot/axios.js'
import { User } from 'src/models/User.js'
import APIRepository from '../classes/APIRepository.js'

export default class AuthAPI extends APIRepository {
  constructor() {
    super('auth', appApi)
    this.APIAdresses = {
      login: '/uma/users/login',
      sendOtp: '/uma/users/send_otp',
      signUp: '/uma/users/sign_up',
      setPass: '/uma/users/set_password',

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

  sendOtpSignUp (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendOtp,
      data: this.getNormalizedSendData({
        input: '', // String
        action: 'SIGN_UP' // String
      }, data),
      resolveCallback: (response) => {
        return response.data.message // String (ok)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sendOtpForgotPassword (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendOtp,
      data: this.getNormalizedSendData({
        input: '', // String
        action: 'FORGOT_PASSWORD' // String
      }, data),
      resolveCallback: (response) => {
        return response.data.message // String (ok)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setPassword (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.setPass,
      data: this.getNormalizedSendData({
        input: '', // String
        password: '', // String
        otp: '' // String
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

  signUp (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.signUp,
      data: this.getNormalizedSendData({
        input: '', // String
        password: '', // String
        otp: '', // String
        firstname: '', // String
        lastname: '' // String
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
