import { Collection, Model } from 'js-abstract-model'

class AnswerSheet extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'answer_text' },
      { key: 'answer_attachment' },
      { key: 'score' },
      { key: 'test_set_question' },
      { key: 'test_set_question_info' }
    ])
  }
}

class AnswerSheetList extends Collection {
  model () {
    return AnswerSheet
  }
}

export { AnswerSheet, AnswerSheetList }
