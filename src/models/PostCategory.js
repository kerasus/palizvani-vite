import { Collection, Model } from 'js-abstract-model'

class PostCategory extends Model {
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

class PostCategoryList extends Collection {
  model () {
    return PostCategory
  }
}

export { PostCategory, PostCategoryList }
