import { Collection, Model } from 'js-abstract-model'
import { MediaList } from 'src/models/Media.js'

class Product extends Model {
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
      {
        key: 'discount_percent',
        default: 0
      },
      { key: 'description' },
      { key: 'maximum_order_count' },
      { key: 'is_physical' },
      { key: 'is_hidden' },
      { key: 'weight' },
      { key: 'physical_type' },
      { key: 'specification' },
      {
        key: 'is_add_to_basket_disabled',
        default: true
      },
      {
        key: 'is_purchased',
        default: false
      },
      {
        key: 'medias',
        default: []
      },
      {
        key: 'medias_info',
        relatedModel: MediaList
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
            label: 'نمایان',
            value: true
          },
          {
            label: 'مخفی',
            value: false
          }
        ]
      },
      physical_type: {
        infoKey: 'physical_type_info',
        enumListKey: 'physical_typeEnums',
        enums: [
          {
            label: 'لوح فشرده',
            value: 'CD'
          },
          {
            label: 'کتاب',
            value: 'BOOK'
          },
          {
            label: 'جزوه',
            value: 'MANUSCRIPT'
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

class ProductList extends Collection {
  model () {
    return Product
  }
}

export { Product, ProductList }
