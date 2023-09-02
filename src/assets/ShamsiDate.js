import moment from 'moment-jalaali'
// import fa from 'moment/src/locale/fa'
// moment.locale('fa', fa)
moment.loadPersian()

class ShamsiDate {
  static getTerm (dateTime) {
    return moment(dateTime, 'YYYY-M-D HH:mm:ss').format('jMMMM jYYYY')
  }

  static getDateTime (dateTime) {
    return moment(dateTime, 'YYYY-M-D HH:mm:ss').format('HH:mm:ss jYYYY/jMM/jDD')
  }

  static getTitledDateTime (dateTime) {
    return moment(dateTime, 'YYYY-M-D HH:mm:ss').format('jD jMMMM jYYYY')
  }
}

export default ShamsiDate
