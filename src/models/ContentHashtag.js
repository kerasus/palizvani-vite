import { Collection, Model } from 'js-abstract-model'

class ContentHashtag extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'order' }
    ])
  }
}

class ContentHashtagList extends Collection {
  model () {
    return ContentHashtag
  }
}

export { ContentHashtag, ContentHashtagList }
