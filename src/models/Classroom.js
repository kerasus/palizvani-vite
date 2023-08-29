import { User } from 'src/models/User.js'
import { Unit } from 'src/models/Unit.js'
import { SessionList } from 'src/models/Session.js'
import { Model, Collection } from 'js-abstract-model'

class Classroom extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'thumbnail' },
      { key: 'title' },
      { key: 'holding_type' },
      { key: 'audience_gender_type' },
      { key: 'holding_year' },
      { key: 'holding_month' },
      { key: 'sessions_frequency' },
      { key: 'professor' },
      { key: 'current_user_register_info' },
      {
        key: 'professor_info',
        relatedModel: User
      },
      { key: 'unit' },
      {
        key: 'unit_info',
        relatedModel: Unit
      },
      {
        key: 'sessions_info',
        relatedModel: SessionList
      },
      { key: 'audience_role' },
      { key: 'price' },
      { key: 'capacity' },
      { key: 'used_capacity' },
      { key: 'allowed_absence_count' },
      { key: 'effective_absence_coefficient' },
      { key: 'mandatory_assignment_count' },
      { key: 'minimum_passing_mark' },
      { key: 'minimum_conditional_passing_mark' },
      { key: 'minimum_clean_passing_mark' },
      { key: 'special_passing_mark' },
      { key: 'live_streaming_url' },
      { key: 'classroom_address' },
      { key: 'beginning_enrollment_period' },
      { key: 'ending_enrollment_period' },
      { key: 'beginning_registration_period' },
      { key: 'ending_registration_period' },
      { key: 'allow_dropping_on_registration_period' },
      { key: 'registration_period_refund_percent' },
      { key: 'beginning_drop_add_period' },
      { key: 'ending_drop_add_period' },
      { key: 'allow_adding_on_drop_add_period' },
      { key: 'allow_dropping_on_drop_add_period' },
      { key: 'drop_add_period_refund_percent' },
      { key: 'is_enabled_enrolment' },
      { key: 'is_enabled_adding' },
      { key: 'is_enabled_viewing' },
      { key: 'is_enabled_dropping' },
      { key: 'rules' },
      { key: 'description' },
      { key: 'is_current_user_registered' },
      { key: 'publish_time' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'status' }

    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'قبل از دوره حذف و اضافه',
            value: 'BEFORE_DROP_ADD_PERIOD'
          },
          {
            label: 'در دوره حذف و اضافه',
            value: 'IN_REGISTRATION_PERIOD'
          }
        ]
      }
    })

    if (!this.thumbnail) {
      this.thumbnail = '/assets/images/web/sample-class-thumbnail.jpg'
    }
  }

  getUserRegisterInfoLabel (status) {
    const enums = {
      REGISTERED: 'ثبت نام شده',
      ENROLLED: 'پیش ثبت نام شده',
      DROPPED_BY_ITSELF: 'حذف شده توسط اندیشه جو',
      DROPPED_BY_ADMIN: 'حذف شده توسط ادمین'
    }

    const target = status || this.current_user_register_info?.status

    return enums[target] || null
  }
}

class ClassroomList extends Collection {
  model () {
    return Classroom
  }
}
export { Classroom, ClassroomList }
