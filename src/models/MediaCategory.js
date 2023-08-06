import { Collection, Model } from 'js-abstract-model'

class MediaCategory extends Model {
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

class MediaCategoryList extends Collection {
  model () {
    return MediaCategory
  }
}

export { MediaCategory, MediaCategoryList }
