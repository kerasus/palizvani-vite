import { Invoice } from 'src/models/Invoice.js'
import { Model, Collection } from 'js-abstract-model'

class InstalmentOffer extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'amount' },
      { key: 'count' },
      { key: 'due_date_interval' },
      { key: 'starting_date' },
      { key: 'description' },
      { key: 'is_accepted' },
      { key: 'invoice' },
      {
        key: 'invoice_info',
        relatedModel: Invoice
      }
    ])
  }
}

class InstalmentOfferList extends Collection {
  model() {
    return InstalmentOffer
  }
}

export { InstalmentOffer, InstalmentOfferList }
