import { User } from 'src/models/User.js'
import { Unit } from 'src/models/Unit.js'
import { Model, Collection } from 'js-abstract-model'

class Event extends Model {
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
      { key: 'category' },
      { key: 'item_type' },
      { key: 'audience_gender_type' },
      { key: 'holding_year' },
      { key: 'holding_month' },
      { key: 'sessions_frequency' },
      { key: 'professor' },
      { key: 'specification' },
      { key: 'bulletin' },
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
      { key: 'audience_role' },
      { key: 'price' },
      { key: 'codes' },
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
          { label: 'منتشر نشده', value: 'NOT_PUBLISHED_YET', showInUserFilters: false },
          { label: 'قبل از مرحله پیش ثبت نام', value: 'BEFORE_ENROLLMENT_PERIOD', showInUserFilters: false },
          { label: 'مرحله پیش ثبت نام', value: 'IN_ENROLLMENT_PERIOD', showInUserFilters: true },
          { label: 'قبل از مرحله ثبت نام', value: 'BEFORE_REGISTRATION_PERIOD', showInUserFilters: false },
          { label: 'مرحله ثبت نام', value: 'IN_REGISTRATION_PERIOD', showInUserFilters: true },
          { label: 'قبل از مرحله حذف و اضافه', value: 'BEFORE_DROP_ADD_PERIOD', showInUserFilters: false },
          { label: 'مرحله حذف و اضافه', value: 'IN_DROP_ADD_PERIOD', showInUserFilters: true },
          { label: 'جاری', value: 'ONGOING', showInUserFilters: true },
          { label: 'پایان یافته', value: 'FINISHED', showInUserFilters: true }
        ]
      },
      holding_type: {
        infoKey: 'holding_type_info',
        enumListKey: 'holding_typeEnums',
        enums: [
          { label: 'برخط(آنلاین)', value: 'ONLINE' },
          { label: 'برون خط(آفلاین)', value: 'OFFLINE' },
          { label: 'حضوری', value: 'FACE_TO_FACE' }
        ]
      },
      category: {
        infoKey: 'category_info',
        enumListKey: 'categoryEnums',
        enums: [
          { label: 'عمومی', value: 'OMOUMI' },
          { label: 'هیئت', value: 'HEIAT' },
          { label: 'ارزاق', value: 'ARZAGH' },
          { label: 'اردو', value: 'ORDOO' }
        ]
      },
      item_type: {
        infoKey: 'item_type_info',
        enumListKey: 'item_typeEnums',
        enums: [
          { label: 'دوره آموزشی', value: 'CLASSROOM' },
          { label: 'حلقه مباحثاتی', value: 'DISCUSSION_CIRCLE' }
        ]
      },
      audience_gender_type: {
        infoKey: 'audience_gender_type_info',
        enumListKey: 'audience_gender_typeEnums',
        enums: [
          { label: 'آقایان', value: 'MALE' },
          { label: 'خانم ها', value: 'FEMALE' },
          { label: 'خانم ها و آقایان', value: 'FEMALE_MALE' }
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

class EventList extends Collection {
  model () {
    return Event
  }
}
export { Event, EventList }
