import { Collection, Model } from 'js-abstract-model'

class TicketCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' }
    ])
  }

  getCategoryTypeFromSourceType (sourceType) {
    if (!sourceType) {
      return null
    }

    if (sourceType === 'TRAINING_CLASSROOM') {
      return 'EDUCATIONAL'
    } else if (sourceType === 'DISCUSSION_CIRCLE_CLASSROOM') {
      return 'EDUCATIONAL'
    } else if (sourceType === 'INVOICE') {
      return 'FINANCIAL'
    } else if (sourceType === 'CONTENT') {
      return 'CONTENT'
    } else {
      return 'GENERAL'
    }
  }
}

class TicketCategoryList extends Collection {
  model () {
    return TicketCategory
  }
}

export { TicketCategory, TicketCategoryList }
