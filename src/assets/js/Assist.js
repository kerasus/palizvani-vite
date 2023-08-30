import moment from 'moment-jalaali'
moment.loadPersian()
const PersianDate = null

class Assist {
  // constructor() {}

  static isValidData(data) {
    return (typeof data !== 'undefined' && data !== null && data !== '')
  }

  static optional(data, optionalData, refinementData) {
    if (this.isValidData(data)) {
      if (typeof refinementData === 'function') {
        return refinementData(data)
      } else {
        return data
      }
    } else {
      if (typeof optionalData !== 'undefined') {
        return optionalData
      } else {
        return null
      }
    }
  }

  static miladiToShamsi(miladi, format = 'jYYYY/jMM/jDD HH:mm:ss') {
    if (!miladi) {
      return null
    }

    return moment(miladi, 'YYYY/M/D HH:mm:ss').locale('fa').format(format)
  }

  static diffDate(date1, date2, diffType) {
    const a = new PersianDate(new Date(date1)),
      b = new PersianDate(new Date(date2))
    return a.diff(b, diffType)
  }

  static getErrors(errors) {
    const errorsArray = []

    for (const prop in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, prop)) {
        for (let i = 0; typeof errors[prop][i] !== 'undefined'; i++) {
          errorsArray.push(errors[prop][i])
        }
      }
    }

    return errorsArray
  }

  static stringContain(search, string) {
    if (typeof search === 'undefined' || search === null || search.trim().length === 0) {
      return true
    }

    const filterWords = search.split(' ')
    for (let i = 0; typeof filterWords[i] !== 'undefined'; i++) {
      const exp = '^.*(' + filterWords[i] + ')+.*$',
        patt = new RegExp(exp)
      if (!patt.test(string)) {
        return false
      }
    }

    return true
  }

  static saveCSV (data, fileName) {
    const csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data)
    const exportLink = document.createElement('a')
    exportLink.setAttribute('href', csvData)
    exportLink.setAttribute('download', fileName + '.csv')
    exportLink.setAttribute('target', '_blank')
    exportLink.click()
    // exportLink.appendChild(document.createTextNode('test.csv'));

    // document.getElementById('results').appendChild(exportLink);

    // const exportLink = document.createElement('a')
    // exportLink.setAttribute('href', 'data:text/csv;base64,' + window.btoa(data))
    // exportLink.appendChild(document.createTextNode(fileName + '.csv'))
    // document.getElementById('results').appendChild(exportLink)
  }
}

export default Assist
