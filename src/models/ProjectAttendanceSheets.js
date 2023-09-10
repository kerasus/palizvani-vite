import { Model, Collection } from 'js-abstract-model'

class ProjectAttendanceSheets extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'project' },
      { key: 'answer_text' },
      { key: 'answer_attachment' }
    ])
  }
}

class ProjectAttendanceSheetsList extends Collection {
  model () {
    return ProjectAttendanceSheets
  }
}
export { ProjectAttendanceSheets, ProjectAttendanceSheetsList }
