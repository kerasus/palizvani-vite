import { ProductList } from 'src/models/Product'
import { Collection, Model } from 'js-abstract-model'

class Package extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'thumbnail' },
      { key: 'title' },
      { key: 'inventory' },
      { key: 'store_category' },
      { key: 'content_category' },
      { key: 'unit_price' },
      { key: 'discount_percent' },
      { key: 'description' },
      { key: 'maximum_order_count' },
      { key: 'weight' },
      { key: 'specification' },
      { key: 'products' },
      {
        key: 'products_info',
        relatedModel: ProductList
      }
    ])

    if (!this.thumbnail) {
      this.thumbnail = '/img/sample-post-thumbnail.jpg'
    }
  }
}

class PackageList extends Collection {
  model () {
    return Package
  }
}

export { Package, PackageList }
