import { Notify } from 'quasar'
import { appApi } from 'src/boot/axios.js'
import API_ADDRESS from 'src/api/Addresses'

const axios = appApi

const actions = {
  editPageWidget: (context, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(API_ADDRESS.pages.base, { key: data.key, value: JSON.stringify(data.sections) })
        .then(r => {
          const parsedData = JSON.parse(r.data.data.value)
          context.commit('updateCurrentSections', parsedData)
          context.commit('updateInitialSections', parsedData)
          Notify.create({
            message: 'تغییرات با موفقیت ذخیره شد',
            type: 'positive'
          })
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getPageWidget: (context, value) => {
    return new Promise((resolve, reject) => {
      axios
        .get(API_ADDRESS.pages.show(value))
        .then(r => {
          const parsedData = JSON.parse(r.data.data.value)
          context.commit('updateCurrentSections', parsedData)
          context.commit('updateInitialSections', parsedData)
          resolve(r)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default actions
