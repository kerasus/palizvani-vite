import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'
import { RegistrationList } from 'src/models/Registration.js'

class Basket extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      // -----------------
      { key: 'unit_price' },
      { key: 'title' },
      { key: 'thumbnail' },
      { key: 'slug' },
      { key: 'slug' },
      { key: 'product_type' },
      { key: 'description' },
      { key: 'capacity' },
      // -----------------
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      {
        key: 'registrations_info',
        relatedModel: RegistrationList
      },
      { key: 'status' },
      { key: 'amount' },
      { key: 'description' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' }
    ])

    this.statusEnums = [
      {
        label: 'باز',
        value: 'OPEN'
      },
      {
        label: 'لغو شده',
        value: 'CANCELED'
      },
      {
        label: 'بسته شده',
        value: 'CLOSED'
      },
      {
        label: 'پرداخت شده',
        value: 'PAID'
      }
    ]

    this.loadStatusInfo()
  }

  loadStatusInfo () {
    const target = this.statusEnums.find(type => type.value === this.status)
    if (!target) {
      this.status_info = {
        label: null,
        value: null
      }
    } else {
      this.status_info = target
    }
  }
}

class BasketList extends Collection {
  model() {
    return Basket
  }
}

export { Basket, BasketList }
