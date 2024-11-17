import { MediaList } from 'src/models/Media.js'
import { Collection, Model } from 'js-abstract-model'
import { CelebrityList } from 'src/models/Celebrity.js'
import { ContentCategory } from 'src/models/ContentCategory.js'
import { ContentHashtagList } from 'src/models/ContentHashtag.js'

class Content extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'summary' },
      { key: 'thumbnail' },
      {
        key: 'is_free',
        defalut: false
      },
      {
        key: 'is_hidden',
        defalut: true
      },
      {
        key: 'medias',
        defalut: []
      },
      {
        key: 'medias_info',
        relatedModel: MediaList
      },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: ContentCategory
      },
      {
        key: 'celebrities',
        relatedModel: CelebrityList
      },
      { key: 'hashtags' },
      {
        key: 'hashtags_info',
        relatedModel: ContentHashtagList
      }
    ], {
      is_hidden: {
        infoKey: 'is_hidden_info',
        enumListKey: 'is_hiddenEnums',
        enums: [
          {
            label: 'نمایان',
            value: true
          },
          {
            label: 'مخفی',
            value: false
          }
        ]
      }
    })

    if (!this.thumbnail) {
      this.thumbnail = '/img/sample-post-thumbnail.jpg'
    }
  }
}

class ContentList extends Collection {
  model () {
    return Content
  }
}

export { Content, ContentList }
