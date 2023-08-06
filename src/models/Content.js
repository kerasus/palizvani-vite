import { Collection, Model } from 'js-abstract-model'
import { CelebrityList } from 'src/models/Celebrity.js'
import { ContentHashtagList } from 'src/models/ContentHashtag.js'
import { ContentCategoryList } from 'src/models/ContentCategory.js'

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
        key: 'medias',
        defalut: []
      },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: ContentCategoryList
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
    ])

    if (!this.thumbnail) {
      this.thumbnail = '/img/custom/Mask_group2.png'
    }
  }
}

class ContentList extends Collection {
  model () {
    return Content
  }
}

export { Content, ContentList }
