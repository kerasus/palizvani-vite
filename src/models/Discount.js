import { Model, Collection } from 'js-abstract-model'

class Discount extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'code' },
      {
        key: 'percent',
        default: 0
      },
      { key: 'expire_time' }
    ])
  }
}

class DiscountList extends Collection {
  model() {
    return Discount
  }
}

export { Discount, DiscountList }
