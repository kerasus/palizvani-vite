import { TestSet } from 'src/models/TestSet.js'
import { Collection, Model } from 'js-abstract-model'
import { QuestionList } from 'src/models/Question.js'

class Test extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'level' },
      { key: 'unit' },
      { key: 'start_time' },
      { key: 'end_time' },
      { key: 'duration_deadline' },
      { key: 'status' },
      { key: 'test_set' },
      {
        key: 'test_set_info',
        relatedModel: TestSet
      },
      {
        key: 'test_questions',
        default: []
      },
      {
        key: 'test_questions_info',
        relatedModel: QuestionList
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
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'ساخته شده',
            value: 'CREATED'
          },
          {
            label: 'قبل از برگزاری',
            value: 'BEFORE_HOLDING'
          },
          {
            label: 'برگزاری',
            value: 'HOLDING'
          },
          {
            label: 'قبل از اعلام نتایج',
            value: 'BEFORE_ANNOUNCEMENT'
          },
          {
            label: 'اعلام نتایج',
            value: 'ANNOUNCEMENT'
          },
          {
            label: 'دریافت اعتراضات',
            value: 'OBJECTION'
          },
          {
            label: 'رسیدگی به اعتراضات',
            value: 'OBJECTION_ANNOUNCEMENT'
          },
          {
            label: 'خاتمه',
            value: 'CLOSED'
          },
          {
            label: 'خاتمه یافته',
            value: 'FINISHED'
          }
        ]
      }
    })
  }
}

class TestList extends Collection {
  model () {
    return Test
  }
}

export { Test, TestList }
