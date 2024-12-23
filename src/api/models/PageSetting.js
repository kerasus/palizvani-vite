import { appApi } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { PageSetting, PageSettingList } from 'src/models/PageSetting.js'

export default class PageSettingAPI extends APIRepository {
  constructor() {
    super('page-setting', appApi)
    this.APIAdresses = {
      base: '/cma/settings',
      getWithKey: (key) => '/cma/settings/key/' + key,
      updateWithKey: (key) => '/admin/setting/' + key
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      getWithKey: (key) => this.name + this.APIAdresses.getWithKey(key)
    }
  }

  index (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          referralCodeList: new PageSettingList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (data) {
    const formData = new FormData()
    formData.append('key', data.key)
    formData.append('value', data.value)
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: formData,
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  update (data) {
    // const settingKey = encodeURI(data.key)
    const settingKey = data.key
    const settingValue = data.value
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: {
        key: settingKey,
        value: settingValue
      },
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  get (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getWithKey(encodeURI(data)),
      cacheKey: this.CacheList.getWithKey(encodeURI(data)),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new PageSetting(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
