import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'
import { TicketCategory } from 'src/models/TicketCategory.js'

class Notice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'body' }, //
      { key: 'priority' }, // HIGH - ...
      { key: 'status' }, // ADMIN_REPLIED - ...
      { key: 'state' },
      { key: 'creation_time' },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: TicketCategory
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
            label: 'باز شده',
            value: 'OPENED'
          },
          {
            label: 'پاسخ داده شده',
            value: 'ADMIN_REPLIED'
          },
          {
            label: 'در حال انتظار',
            value: 'PENDING'
          },
          {
            label: 'خوانده نشده',
            value: 'UNREAD'
          },
          {
            label: 'خوانده شده',
            value: 'READ'
          },
          {
            label: 'بسته شده',
            value: 'CLOSED'
          }
        ]
      },
      state: {
        infoKey: 'state_info',
        enumListKey: 'stateEnums',
        enums: [
          {
            label: 'باز شده',
            value: 'OPENED'
          },
          {
            label: 'پاسخ داده شده',
            value: 'ADMIN_REPLIED'
          },
          {
            label: 'در حال انتظار',
            value: 'PENDING'
          },
          {
            label: 'خوانده نشده',
            value: 'UNREAD'
          },
          {
            label: 'خوانده شده',
            value: 'READ'
          },
          {
            label: 'بسته شده',
            value: 'CLOSED'
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

class NoticeList extends Collection {
  model () {
    return Notice
  }
}

export { Notice, NoticeList }
