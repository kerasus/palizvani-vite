import { Collection, Model } from 'js-abstract-model'

class TicketCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'type' }
    ], {
      type: {
        infoKey: 'type_info',
        enumListKey: 'typeEnums',
        enums: [
          { label: 'معاونت آموزش', value: 'EDUCATIONAL' },
          { label: 'معاونت مالی', value: 'FINANCIAL' },
          { label: 'معاونت محتوا', value: 'CONTENT' },
          { label: 'معاونت پژوهش', value: 'RESEARCH' },
          { label: 'معاونت سرمایه انسانی', value: 'HR' },
          { label: 'معاونت روابط عمومی', value: 'GENERAL' }
        ]
      }
    })
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
