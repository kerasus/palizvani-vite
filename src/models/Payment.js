import { User } from 'src/models/User'
import { Invoice } from 'src/models/Invoice.js'
import { Model, Collection } from 'js-abstract-model'
import { Transaction } from 'src/models/Transaction.js'

class Payment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'invoice' },
      {
        key: 'invoice_info',
        relatedModel: Invoice
      },
      { key: 'wallet' },
      { key: 'transaction' },
      {
        key: 'transaction_info',
        relatedModel: Transaction
      },
      { key: 'amount' },
      { key: 'description' },
      { key: 'type' }, // WITHDRAW - ...
      {
        key: 'additional_data',
        default: []
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'receipt' },
      { key: 'IBAN' },
      { key: 'is_active' },
      { key: 'is_deleted' }
    ], {
      type: {
        infoKey: 'type_info',
        enumListKey: 'typeEnums',
        enums: [
          {
            label: 'برداشت',
            value: 'WITHDRAW'
          },
          {
            label: 'درخواست برداشت',
            value: 'WITHDRAW_REQUEST'
          },
          {
            label: 'برداشت رد شده',
            value: 'WITHDRAW_REJECT'
          },
          {
            label: 'واریز',
            value: 'DEPOSIT'
          }
        ]
      }
    })
  }
}

class PaymentList extends Collection {
  model () {
    return Payment
  }
}
export { Payment, PaymentList }
