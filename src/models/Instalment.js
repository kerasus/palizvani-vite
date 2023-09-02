import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'
import { InstalmentOffer } from 'src/models/InstalmentOffer.js'

class Instalment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'amount',
        default: 0
      },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'due_date' },
      { key: 'instalment_offer' },
      {
        key: 'instalment_offer_info',
        relatedModel: InstalmentOffer
      },
      { key: 'invoice' },
      { key: 'invoice_info' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'paid_time' },
      { key: 'payer' },
      {
        key: 'payer_info',
        relatedModel: User
      },
      { key: 'wallet_inventory' }
    ])
  }
}

class InstalmentList extends Collection {
  model() {
    return Instalment
  }
}

export { Instalment, InstalmentList }
