import { Collection, Model } from 'js-abstract-model'

class ContentCategory extends Model {
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

class ContentCategoryList extends Collection {
  model () {
    return ContentCategory
  }
}

export { ContentCategory, ContentCategoryList }
