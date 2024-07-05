import { Collection, Model } from 'js-abstract-model'

class Product extends Model {
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
      { key: 'is_physical' },
      { key: 'weight' },
      { key: 'physical_type' },
      { key: 'specification' }
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
      physical_type: {
        infoKey: 'physical_type_info',
        enumListKey: 'physical_typeEnums',
        enums: [
          {
            label: 'سی دی',
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
}

class ProductList extends Collection {
  model () {
    return Product
  }
}

export { Product, ProductList }
