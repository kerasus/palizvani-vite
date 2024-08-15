import { Collection, Model } from 'js-abstract-model'

class ContentCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'thumbnail' },
      { key: 'description' },
      { key: 'parent' },
      { key: 'parent_info' },
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
