import { Collection, Model } from 'js-abstract-model'

class QuestionChoice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      // { key: 'question' },
      { key: 'text' }
    ])
  }
}

class QuestionChoiceList extends Collection {
  model () {
    return QuestionChoice
  }
}

export { QuestionChoice, QuestionChoiceList }
