import { Collection, Model } from 'js-abstract-model'

class TestSet extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'level' },
      { key: 'unit' },
      {
        key: 'test_questions',
        default: []
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
      }
    })
  }
}

class TestSetList extends Collection {
  model () {
    return TestSet
  }
}

export { TestSet, TestSetList }
