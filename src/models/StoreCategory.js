import { Collection, Model } from 'js-abstract-model'

class StoreCategory extends Model {
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

class StoreCategoryList extends Collection {
  model () {
    return StoreCategory
  }
}

export { StoreCategory, StoreCategoryList }
