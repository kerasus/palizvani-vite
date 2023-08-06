import { Collection, Model } from 'js-abstract-model'

class MediaHashtag extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'order' }
    ])
  }
}

class MediaHashtagList extends Collection {
  model () {
    return MediaHashtag
  }
}

export { MediaHashtag, MediaHashtagList }
