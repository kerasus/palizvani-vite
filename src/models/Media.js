import { Collection, Model } from 'js-abstract-model'
import { CelebrityList } from 'src/models/Celebrity.js'
import { MediaHashtagList } from 'src/models/MediaHashtag.js'
import { MediaCategory } from 'src/models/MediaCategory.js'

class Media extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'type' }, // VIDEO - TEXT - SOUND - IMAGE
      { key: 'source_type' }, // CONTENT - SETTING
      { key: 'url' },
      { key: 'iframe_code' },
      { key: 'script_code' },
      { key: 'is_live_streaming' },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: MediaCategory
      },
      { key: 'description' },
      {
        key: 'celebrities',
        relatedModel: CelebrityList
      },
      { key: 'hashtags' },
      {
        key: 'hashtags_info',
        relatedModel: MediaHashtagList
      },
      { key: 'file' }
    ], {
      type: {
        infoKey: 'type_info',
        enumListKey: 'typeEnums',
        enums: [
          {
            label: 'ویدیو',
            value: 'VIDEO'
          },
          // {
          //   label: 'متن',
          //   value: 'TEXT'
          // },
          {
            label: 'صوت',
            value: 'SOUND'
          },
          {
            label: 'تصویر',
            value: 'IMAGE'
          },
          {
            label: 'سند',
            value: 'DOCUMENT'
          }
        ]
      },
      source_type: {
        infoKey: 'source_type_info',
        enumListKey: 'source_typeEnums',
        enums: [
          {
            label: 'ویدیو',
            value: 'VIDEO'
          },
          {
            label: 'متن',
            value: 'TEXT'
          },
          {
            label: 'صوت',
            value: 'SOUND'
          },
          {
            label: 'عکس',
            value: 'IMAGE'
          },
          {
            label: 'محصول',
            value: 'PRODUCT'
          }
        ]
      }
    })
  }
}

class MediaList extends Collection {
  model () {
    return Media
  }

  getType (type) {
    return this.list.filter(item => item.type === type)
  }
}

export { Media, MediaList }
