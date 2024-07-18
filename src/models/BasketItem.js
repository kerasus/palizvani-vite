// import { Basket } from 'src/models/Basket.js'
import { Package } from 'src/models/Package.js'
import { Product } from 'src/models/Product.js'
import { Model, Collection } from 'js-abstract-model'

class BasketItem extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      // -----------------
      { key: 'basket' },
      // {
      //   key: 'basket_info',
      //   relatedModel: Basket
      // },
      { key: 'package' },
      {
        key: 'package_info',
        relatedModel: Package
      },
      { key: 'product' },
      {
        key: 'product_info',
        relatedModel: Product
      },
      {
        key: 'count',
        default: 0
      }
    ])
  }
}

class BasketItemList extends Collection {
  model() {
    return BasketItem
  }
}

export { BasketItem, BasketItemList }
