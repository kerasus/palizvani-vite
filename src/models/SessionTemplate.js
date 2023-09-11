import { Unit } from 'src/models/Unit.js'
import { Model, Collection } from 'js-abstract-model'

class SessionTemplate extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'unit' },
      {
        key: 'unit_info',
        relatedModel: Unit
      },
      { key: 'title' },
      { key: 'syllabus' },
      { key: 'description' },
      { key: 'beginning_time' },
      { key: 'ending_time' },
      { key: 'question' },
      { key: 'answer' },
      { key: 'question_info' },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])
  }
}

class SessionTemplateList extends Collection {
  model () {
    return SessionTemplate
  }
}
export { SessionTemplate, SessionTemplateList }
