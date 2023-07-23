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
      { key: 'starting_time' },
      { key: 'ending_time' },
      { key: 'question' },
      { key: 'question_info' },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])
  }
}

class SessionList extends Collection {
  model () {
    return Session
  }
}
export { Session, SessionList }
