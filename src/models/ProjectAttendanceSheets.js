import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class ProjectAttendanceSheets extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'project' },
      { key: 'is_answer_verified' },
      { key: 'answer_text' },
      { key: 'answer_status' },
      { key: 'answer_attachment' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      }
    ], {
      answer_status: {
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
      }
    })
  }
}

class ProjectAttendanceSheetsList extends Collection {
  model () {
    return ProjectAttendanceSheets
  }
}
export { ProjectAttendanceSheets, ProjectAttendanceSheetsList }
