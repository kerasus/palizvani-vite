import { Unit } from 'src/models/Unit.js'
import { Model, Collection } from 'js-abstract-model'

class TranscriptSheetHistory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'unit' },
      {
        key: 'unit_info',
        relatedModel: Unit
      },
      { key: 'national_code' },
      { key: 'score' },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ])
  }
}

class TranscriptSheetHistoryList extends Collection {
  model () {
    return TranscriptSheetHistory
  }
}
export { TranscriptSheetHistory, TranscriptSheetHistoryList }
