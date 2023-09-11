import { Model, Collection } from 'js-abstract-model'

class SessionAttendanceSheets extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'session' },
      { key: 'is_listen_part1' },
      { key: 'is_listen_part2' },
      { key: 'is_present_read_part1' },
      { key: 'is_present_read_part2' }
    ])
  }

  getLabel () {
    if (this.is_listen_part1 && this.is_listen_part2 && this.is_present_read_part1 && this.is_present_read_part2) {
      return 'حاضر'
    } else if (this.is_listen_part1 && this.is_listen_part2 && this.is_present_read_part1 && !this.is_present_read_part2) {
      return 'حاضر'
    } else if (this.is_listen_part1 && this.is_listen_part2 && !this.is_present_read_part1 && !this.is_present_read_part2) {
      return 'حاضر'
    } else if (this.is_listen_part1 && !this.is_listen_part2 && !this.is_present_read_part1 && !this.is_present_read_part2) {
      return 'حاضر'
    } else if (this.is_listen_part1) {
      return 'قسمت اول'
    } else if (this.is_listen_part2) {
      return 'قسمت دوم'
    } else if (this.is_present_read_part1) {
      return 'قسمت اول'
    } else if (this.is_present_read_part2) {
      return 'قسمت اول'
    } else {
      return 'غایب'
    }
  }
}

class SessionAttendanceSheetsList extends Collection {
  model () {
    return SessionAttendanceSheets
  }
}
export { SessionAttendanceSheets, SessionAttendanceSheetsList }
