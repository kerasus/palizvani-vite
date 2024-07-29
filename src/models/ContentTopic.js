import { Content } from 'src/models/Content.js'
import { Collection, Model } from 'js-abstract-model'
import { ContentHashtagList } from 'src/models/ContentHashtag.js'
import { ContentTopicCategory } from 'src/models/ContentTopicCategory.js'

class ContentTopic extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'text' },
      { key: 'thumbnail' },
      { key: 'content' },
      {
        key: 'content_info',
        relatedModel: Content
      },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: ContentTopicCategory
      },
      { key: 'hashtags' },
      {
        key: 'hashtags_info',
        relatedModel: ContentHashtagList
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])
  }
}

class ContentTopicList extends Collection {
  model () {
    return ContentTopic
  }
}

export { ContentTopic, ContentTopicList }
