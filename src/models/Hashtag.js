import { Model, Collection } from 'js-abstract-model'

class Hashtag extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' }
    ])
  }
}

class HashtagList extends Collection {
  model() {
    return Hashtag
  }
}

export { Hashtag, HashtagList }
