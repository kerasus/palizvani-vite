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
          { label: 'CLEAN_PASSED', value: 'CLEAN_PASSED' }
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
