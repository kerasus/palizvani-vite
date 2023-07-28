import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'

class TicketReply extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'body' },
      { key: 'ticket' },
      { key: 'read' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      }
    ])
  }
}

class TicketReplyList extends Collection {
  model () {
    return TicketReply
  }
}

export { TicketReply, TicketReplyList }
