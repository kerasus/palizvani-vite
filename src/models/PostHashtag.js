import { Collection, Model } from 'js-abstract-model'

class PostHashtag extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'order' }
    ])
  }
}

class PostHashtagList extends Collection {
  model () {
    return PostHashtag
  }
}

export { PostHashtag, PostHashtagList }
