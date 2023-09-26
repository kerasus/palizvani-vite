import { Model, Collection } from 'js-abstract-model'

class SessionAttendanceSheets extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'is_answer_verified' },
      { key: 'answer_status' },
      { key: 'answer_text' },
      { key: 'answer_attachment' },
      { key: 'answer_info' },
      { key: 'session' },
      {
        key: 'session_attendance_sheets',
        default: []
      },
      { key: 'assignment_status' },
      {
        key: 'attendance_status',
        default: 'NOT_SENT'
      },
      { key: 'is_listen_part1' },
      { key: 'is_listen_part2' },
      { key: 'is_present_read_part1' },
      { key: 'is_present_read_part2' },
      { key: 'owner' },
      { key: 'owner_info' },
      { key: 'creator' },
      { key: 'creator_info' },
      { key: 'session' },
      { key: 'session_info' },
      { key: 'assignment_status' },
      { key: 'creation_time' }
    ], {
      status: {
        infoKey: 'is_answer_verified_info',
        enumListKey: 'is_answer_verifiedEnums',
        enums: [
          {
            label: 'تایید شده',
            value: true
          },
          {
            label: 'تایید نشده',
            value: false
          },
          {
            label: '-',
            value: null
          }
        ]
      },
      type: {
        infoKey: 'answer_status_info',
        enumListKey: 'answer_statusEnums',
        enums: [
          {
            label: 'ارسال نشده',
            value: 'NOT_SENT'
          },
          {
            label: 'ارسال شده',
            value: 'SENT'
          },
          {
            label: 'بررسی شده',
            value: 'REVIEWED'
          }
        ]
      },
      assignment_status: {
        infoKey: 'assignment_status_info',
        enumListKey: 'assignment_statusEnums',
        enums: [
          {
            label: 'ارسال نشده',
            value: 'NOT_SENT'
          },
          {
            label: 'ارسال شده',
            value: 'SENT'
          },
          {
            label: 'انجام شده',
            value: 'VERIFIED'
          },
          {
            label: 'انجام نشده',
            value: 'NOT_VERIFIED'
          }
        ]
      },
      attendance_status: {
        infoKey: 'attendance_status_info',
        enumListKey: 'attendance_statusEnums',
        enums: [
          {
            label: 'ارسال نشده',
            value: 'NOT_SENT'
          },
          {
            label: 'ارسال شده',
            value: 'SENT'
          },
          {
            label: 'غایب',
            value: 'ABSENT'
          },
          {
            label: 'قسمت اول',
            value: 'PART1'
          },
          {
            label: 'قسمت دوم',
            value: 'PART2'
          },
          {
            label: 'حاضر',
            value: 'PRESENT'
          }
        ]
      }
    })
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
