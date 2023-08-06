import { Collection, Model } from 'js-abstract-model'

class Celebrity extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'thumbnail' }
    ])
  }
}

class CelebrityList extends Collection {
  model () {
    return Celebrity
  }
}

export { Celebrity, CelebrityList }
