import { Collection, Model } from 'js-abstract-model'
import { CelebrityList } from 'src/models/Celebrity.js'
import { PostCategory } from 'src/models/PostCategory.js'
import { PostHashtagList } from 'src/models/PostHashtag.js'

class Post extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'text' },
      { key: 'summary' },
      { key: 'thumbnail' },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: PostCategory
      },
      {
        key: 'celebrities',
        relatedModel: CelebrityList
      },
      { key: 'hashtags' },
      {
        key: 'hashtags_info',
        relatedModel: PostHashtagList
      }
    ])

    if (!this.thumbnail) {
      this.thumbnail = '/img/sample-post-thumbnail.jpg'
    }
  }
}

class PostList extends Collection {
  model () {
    return Post
  }
}

export { Post, PostList }
