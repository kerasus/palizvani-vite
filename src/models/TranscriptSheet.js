import { Model, Collection } from 'js-abstract-model'

class TranscriptSheet extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'status' }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          { label: 'CLEAN_PASSED', value: 'قبول' },
          { label: 'CONDITIONAL_PASSED', value: 'قبول مشروط' },
          { label: 'FAILED', value: 'مردود' },
          { label: 'FAILED_DUE_TO_PRE_CONDITIONAL', value: 'مردود(سابقه قبول مشروط)' }
        ]
      }
    })
  }
}

class TranscriptSheetList extends Collection {
  model () {
    return TranscriptSheet
  }
}
export { TranscriptSheet, TranscriptSheetList }
