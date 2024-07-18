import { User } from 'src/models/User.js'
import { Invoice } from 'src/models/Invoice.js'
import { Discount } from 'src/models/Discount.js'
import { Model, Collection } from 'js-abstract-model'
import { BasketItemList } from 'src/models/BasketItem.js'

class Basket extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      { key: 'description' },
      { key: 'status' },
      {
        key: 'price',
        default: 0
      },
      {
        key: 'sellable_price',
        default: 0
      },
      {
        key: 'margin_amount',
        default: 0
      },
      { key: 'discount' },
      {
        key: 'discount_info',
        relatedModel: Discount
      },
      {
        key: 'discount_amount',
        default: 0
      },
      {
        key: 'order_price',
        default: 0
      },
      {
        key: 'overall_discount_amount',
        default: 0
      },
      {
        key: 'overall_order_price',
        default: 0
      },
      { key: 'order_time' },
      { key: 'invoice' },
      {
        key: 'invoice_info',
        relatedModel: Invoice
      },
      { key: 'province' },
      { key: 'city' },
      { key: 'address' },
      { key: 'postal_code' },
      {
        key: 'delivery_cost',
        default: 0
      },
      {
        key: 'items_info',
        relatedModel: BasketItemList
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'باز',
            value: 'OPEN'
          },
          {
            label: 'لغو شده',
            value: 'CANCELED'
          },
          {
            label: 'بسته شده',
            value: 'CLOSED'
          },
          {
            label: 'پرداخت شده',
            value: 'PAID'
          }
        ]
      }
    })
  }
}

class BasketList extends Collection {
  model() {
    return Basket
  }
}

export { Basket, BasketList }
