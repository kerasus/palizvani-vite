import { Collection, Model } from 'js-abstract-model'
import { Question } from 'src/models/Question.js'

class TestSetQuestion extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'is_extra_mark' },
      { key: 'mark' },
      { key: 'question' },
      {
        key: 'question_info',
        relatedModel: Question
      }
    ])
  }
}

class TestSetQuestionList extends Collection {
  model () {
    return TestSetQuestion
  }
}

export { TestSetQuestion, TestSetQuestionList }
