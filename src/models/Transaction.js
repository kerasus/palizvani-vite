import { User } from 'src/models/User'
import { Invoice } from 'src/models/Invoice.js'
import { Model, Collection } from 'js-abstract-model'

class Transaction extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'amount' },
      { key: 'authority_code' },
      { key: 'reference_code' },
      { key: 'description' },
      { key: 'status' }, // IN_PROGRESS
      {
        key: 'additional_data',
        default: []
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
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
      { key: 'invoice' },
      {
        key: 'invoice_info',
        relatedModel: Invoice
      }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          { label: 'لغو شده', value: 'CANCELED' },
          { label: 'ناموفق', value: 'FAILED' },
          { label: 'موفق', value: 'SUCCESS' },
          { label: 'خطا', value: 'ERRORED' },
          { label: 'ناشناخته', value: 'UNKNOWN' },
          { label: 'در حال انجام', value: 'IN_PROGRESS' },
          { label: 'در حال اعتبارسنجی', value: 'VERIFYING' }
        ]
      }
    })
  }
}

class TransactionList extends Collection {
  model () {
    return Transaction
  }
}
export { Transaction, TransactionList }
