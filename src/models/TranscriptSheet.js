import { Model, Collection } from 'js-abstract-model'

class TranscriptSheet extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'attendance_score' },
      { key: 'highest_test_score' },
      { key: 'final_score' },
      { key: 'is_sent_by_post' },
      { key: 'certification' },
      { key: 'status' }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          { value: 'CLEAN_PASSED', label: 'قبول' },
          { value: 'CONDITIONAL_PASSED', label: 'قبول مشروط' },
          { value: 'FAILED', label: 'مردود' },
          { value: 'FAILED_DUE_TO_PRE_CONDITIONAL', label: 'مردود(سابقه قبول مشروط)' }
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
