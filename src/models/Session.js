import { Model, Collection } from 'js-abstract-model'
import { User } from 'src/models/User'

class Session extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'classroom' },
      { key: 'title' },
      { key: 'syllabus' },
      { key: 'description' },
      { key: 'beginning_time' },
      { key: 'ending_time' },
      { key: 'questions' },
      { key: 'questions_info' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_defined_syllabus' },
      { key: 'is_show_answer_input' },
      { key: 'is_show_syllabus_input' },
      { key: 'is_show_present_listen_input' },
      { key: 'is_enabled_answering' },
      { key: 'is_enabled_changing_attendance_status' },
      { key: 'current_user_attendance_sheet' },
      { key: 'assignment_description' },
      {
        key: 'session_attendance_sheets',
        defalut: []
      }
    ])
  }
}

class SessionList extends Collection {
  model () {
    return Session
  }
}
export { Session, SessionList }
