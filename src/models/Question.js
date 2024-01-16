import { Collection, Model } from 'js-abstract-model'

class Question extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'text' },
      { key: 'correct_answer' },
      { key: 'mark' },
      { key: 'level' },
      { key: 'model_type' },
      { key: 'choices' },
      { key: 'correct_choice_index' },
      {
        key: 'type',
        default: 'QUESTION_BANK'
      }
    ], {
      level: {
        infoKey: 'level_info',
        enumListKey: 'levelEnums',
        enums: [
          {
            label: 'سطح یک',
            value: 'LEVEL1'
          },
          {
            label: 'سطح دو',
            value: 'LEVEL2'
          },
          {
            label: 'سطح سه',
            value: 'LEVEL3'
          },
          {
            label: 'سطح چهار',
            value: 'LEVEL4'
          },
          {
            label: 'سطح پنج',
            value: 'LEVEL5'
          }
        ]
      },
      type: {
        infoKey: 'type_info',
        enumListKey: 'typeEnums',
        enums: [
          {
            label: 'بانک سوال',
            value: 'QUESTION_BANK'
          }
        ]
      },
      model_type: {
        infoKey: 'model_type_info',
        enumListKey: 'model_typeEnums',
        enums: [
          {
            label: 'تشریحی',
            value: 'OPEN_ENDED'
          },
          {
            label: 'چند گزینه ای',
            value: 'MULTI_CHOICE'
          }
        ]
      }
    })
  }
}

class QuestionList extends Collection {
  model () {
    return Question
  }
}

export { Question, QuestionList }
