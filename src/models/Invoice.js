import { User } from 'src/models/User.js'
import { Classroom } from 'src/models/Classroom.js'
import { Model, Collection } from 'js-abstract-model'

class Invoice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'wallet_inventory' },
      {
        key: 'amount',
        default: 0
      },
      { key: 'description' },
      { key: 'status' },
      { key: 'type' }, // CLASSROOM
      { key: 'additional_data' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'item_id' },
      { key: 'item_type' }, // CLASSROOM
      { key: 'instalments' },
      { key: 'instalments_info' },
      {
        key: 'item_info',
        relatedModel: Classroom
      },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'در حال تأیید',
            value: 'VERIFYING'
          },
          {
            label: 'لغو شد',
            value: 'CANCELED'
          },
          {
            label: 'تأیید نشده',
            value: 'NOT_VERIFIED'
          },
          {
            label: 'درحال پرداخت',
            value: 'PAYING'
          },
          {
            label: 'درحال تایید پرداخت',
            value: 'TRANSACTION_VERIFYING'
          },
          {
            label: 'پرداخت شده',
            value: 'PAID_FULL'
          },
          {
            label: 'درحال پرداخت اقساط',
            value: 'PAYING_IN_INSTALMENT'
          },
          {
            label: 'اقساط پرداخت شده',
            value: 'PAID_IN_INSTALMENT'
          }
        ]
      },
      type: {
        infoKey: 'type_info',
        enumListKey: 'typeEnums',
        enums: [
          {
            label: 'آموزش',
            value: 'CLASSROOM'
          },
          {
            label: 'فروشگاه',
            value: 'STORE_BASKET'
          },
          {
            label: 'رویداد',
            value: 'EVENT'
          }
        ]
      }
    })
  }
}

class InvoiceList extends Collection {
  model() {
    return Invoice
  }
}

export { Invoice, InvoiceList }
