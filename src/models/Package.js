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
      { key: 'sellable_price' },
      { key: 'discount_percent' },
      { key: 'description' },
      { key: 'is_physical' },
      { key: 'maximum_order_count' },
      { key: 'weight' },
      { key: 'specification' },
      { key: 'products' },
      {
        key: 'products_info',
        relatedModel: ProductList
      }
    ], {
      is_physical: {
        infoKey: 'is_physical_info',
        enumListKey: 'is_physicalEnums',
        enums: [
          {
            label: 'فیزیکی',
            value: true
          },
          {
            label: 'مجازی',
            value: false
          }
        ]
      }
    })

    if (!this.thumbnail) {
      this.thumbnail = '/img/sample-post-thumbnail.jpg'
    }
  }

  getFinalPrice () {
    return parseInt(this.unit_price * (100 - this.discount_percent)).toLocaleString('fa')
  }
}

class PackageList extends Collection {
  model () {
    return Package
  }
}

export { Package, PackageList }
