import { Model, Collection } from 'js-abstract-model'
import { User } from 'src/models/User'

class Transaction extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'inventory' },
      { key: 'description' },
      {
        key: 'additional_data',
        default: []
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner',
        relatedModel: User
      }
    ])
  }
}

class TransactionList extends Collection {
  model () {
    return Transaction
  }
}
export { Transaction, TransactionList }
