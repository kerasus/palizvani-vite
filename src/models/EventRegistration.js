import { User } from 'src/models/User.js'
import { Classroom } from 'src/models/Classroom.js'
import { Model, Collection } from 'js-abstract-model'

class EventRegistration extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      { key: 'event' },
      {
        key: 'event_info',
        relatedModel: Classroom
      },
      { key: 'status' }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'پیش ثبت نام',
            value: 'ENROLLED'
          },
          {
            label: 'ثبت نام',
            value: 'REGISTERED'
          },
          {
            label: 'حذف توسط کاربر',
            value: 'DROPPED_BY_ITSELF'
          },
          {
            label: 'حذف توسط ادمین',
            value: 'DROPPED_BY_ADMIN'
          },
          {
            label: 'حذف سیستمی (شرایط غیر مجاز)',
            value: 'DROPPED_FOR_CONDITION'
          }
        ]
      }
    })
  }
}

class EventRegistrationList extends Collection {
  model () {
    return EventRegistration
  }
}
export { EventRegistration, EventRegistrationList }
