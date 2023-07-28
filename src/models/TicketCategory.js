import { Collection, Model } from 'js-abstract-model'

class TicketCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' }
    ])
  }
}

class TicketCategoryList extends Collection {
  model () {
    return TicketCategory
  }
}

export { TicketCategory, TicketCategoryList }
