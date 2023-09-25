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
      { key: 'current_user_attendance_sheet' }
    ])
  }
}

class SessionList extends Collection {
  model () {
    return Session
  }
}
export { Session, SessionList }
