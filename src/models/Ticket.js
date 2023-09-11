import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'
import { TicketReplyList } from 'src/models/TicketReply.js'
import { TicketCategory } from 'src/models/TicketCategory.js'

class Ticket extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'body' }, //
      { key: 'priority' }, // HIGH - ...
      { key: 'status' }, // ADMIN_REPLIED - ...
      { key: 'source_type' }, // INVOICE - CLASSROOM
      { key: 'source_id' },
      { key: 'source' },
      { key: 'category' },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: TicketCategory
      },
      {
        key: 'replies_info',
        relatedModel: TicketReplyList
      },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'در انتظار پاسخ',
            value: 'OPENED',
            color: '#2FA84A'
          },
          {
            label: 'ادمین پاسخ داده',
            value: 'ADMIN_REPLIED',
            color: '#0B6AB1'
          },
          {
            label: 'کاربر پاسخ داده',
            value: 'USER_REPLIED',
            color: '#0B6AB1'
          },
          // {
          //   label: 'در حال انتظار',
          //   value: 'PENDING',
          //   color: '#2FA84A'
          // },
          // {
          //   label: 'خوانده نشده',
          //   value: 'UNREAD',
          //   color: '#2FA84A'
          // },
          // {
          //   label: 'خوانده شده',
          //   value: 'READ',
          //   color: '#2FA84A'
          // },
          {
            label: 'بسته شده',
            value: 'CLOSED',
            color: '#989898'
          }
        ]
      },
      priority: {
        infoKey: 'priority_info',
        enumListKey: 'priorityEnums',
        enums: [
          {
            label: 'بالا',
            value: 'HIGH'
          }
        ]
      }
    })
  }
}

class TicketList extends Collection {
  model () {
    return Ticket
  }
}

export { Ticket, TicketList }
