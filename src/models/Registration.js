import { User } from 'src/models/User.js'
// import { Package } from 'src/models/Package.js'
// import { Service } from 'src/models/Service.js'
import { Collection, Model } from 'js-abstract-model'

class Registration extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'product_info' },
      { key: 'classroom' },
      { key: 'classroom_info' },
      { key: 'item' },
      { key: 'item_info' },
      { key: 'basket' },
      { key: 'count' },
      { key: 'user' },
      {
        key: 'user_info',
        relatedModel: User
      },
      { key: 'status' },
      { key: 'time_status' },
      { key: 'termination_datetime' },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
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
      },
      time_status: {
        infoKey: 'time_status_info',
        enumListKey: 'time_statusEnums',
        enums: [
          {
            label: 'فعال',
            value: 'ONGOING',
            color: '#2FA84A'
          }
        ]
      }
    })

    // this.timeStatusEnums = [
    //   {
    //     label: 'فعال',
    //     value: 'ONGOING',
    //     color: '#2FA84A'
    //   }
    // ]

    // this.loadTimeStatusInfo()
  }

  loadTimeStatusInfo () {
    const target = this.timeStatusEnums.find(type => type.value === this.time_status)
    if (!target) {
      this.time_status_info = {
        label: null,
        value: null,
        color: ''
      }
    } else {
      this.time_status_info = target
    }
  }

  loadProductData () {
    // if (this.product_info.product_type === 'package') {
    //   this.product_data = new Package(this.product_info)
    // } else if (this.product_info.product_type === 'service') {
    //   this.product_data = new Service(this.product_info)
    // }
  }
}

class RegistrationList extends Collection {
  model () {
    return Registration
  }
}

export { Registration, RegistrationList }
