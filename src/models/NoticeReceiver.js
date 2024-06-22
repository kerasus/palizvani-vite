import { User } from 'src/models/User.js'
import { Notice } from 'src/models/Notice.js'
import { Collection, Model } from 'js-abstract-model'

class NoticeReceiver extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'notice' },
      {
        key: 'notice_info',
        relatedModel: Notice
      },
      { key: 'receiver' },
      {
        key: 'receiver_info',
        relatedModel: User
      },
      { key: 'is_seen' },
      { key: 'creation_time' }
    ]
    )
  }
}

class NoticeReceiverList extends Collection {
  model () {
    return NoticeReceiver
  }
}

export { NoticeReceiver, NoticeReceiverList }
