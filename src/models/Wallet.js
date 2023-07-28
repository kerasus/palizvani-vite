import { Model, Collection } from 'js-abstract-model'

class Wallet extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      {
        key: 'inventory',
        default: 0
      },
      { key: 'description' },
      { key: 'additional_data' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'creator' },
      { key: 'owner' }
    ])
  }
}

class WalletList extends Collection {
  model() {
    return Wallet
  }
}

export { Wallet, WalletList }
