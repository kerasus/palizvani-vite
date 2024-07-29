import { Collection, Model } from 'js-abstract-model'

class ContentTopicCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'parent' },
      {
        key: 'children',
        defalut: []
      }
    ])
  }
}

class ContentTopicCategoryList extends Collection {
  model () {
    return ContentTopicCategory
  }
}

export { ContentTopicCategory, ContentTopicCategoryList }
