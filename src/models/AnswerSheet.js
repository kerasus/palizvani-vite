import { Collection, Model } from 'js-abstract-model'
import { TestSetQuestion } from 'src/models/TestSetQuestion.js'

class AnswerSheet extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'answer_text' },
      { key: 'answer_attachment' },
      { key: 'score' },
      { key: 'test_question' },
      {
        key: 'test_question_info',
        relatedModel: TestSetQuestion
      }
    ])
  }
}

class AnswerSheetList extends Collection {
  model () {
    return AnswerSheet
  }
}

export { AnswerSheet, AnswerSheetList }
