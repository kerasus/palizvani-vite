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
      { key: 'store_category_info' },
      { key: 'content_category' },
      { key: 'content_category_info' },
      {
        key: 'unit_price',
        default: 0
      },
      { key: 'sellable_price' },
      { key: 'discount_percent' },
      { key: 'description' },
      { key: 'is_physical' },
      { key: 'is_hidden' },
      { key: 'maximum_order_count' },
      { key: 'weight' },
      {
        key: 'is_add_to_basket_disabled',
        default: false
      },
      {
        key: 'is_purchased',
        default: false
      },
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
      },
      is_hidden: {
        infoKey: 'is_hidden_info',
        enumListKey: 'is_hiddenEnums',
        enums: [
          {
            label: 'پنهان',
            value: true
          },
          {
            label: 'نمایان',
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
