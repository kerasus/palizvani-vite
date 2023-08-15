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
      { key: 'is_active' },
      { key: 'is_deleted' }
    ])

    this.typeEnums = [
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

    this.loadTypeInfo()
  }

  loadTypeInfo () {
    const target = this.typeEnums.find(type => type.value === this.type)
    if (!target) {
      this.type_info = {
        label: null,
        value: null
      }
    } else {
      this.type_info = target
    }
  }
}

class PaymentList extends Collection {
  model () {
    return Payment
  }
}
export { Payment, PaymentList }
