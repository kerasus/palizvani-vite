import { Classroom } from 'src/models/Classroom.js'
import { ContentList } from 'src/models/Content.js'
import { Model, Collection } from 'js-abstract-model'

class Project extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'type' },
      { key: 'beginning_doing_period' },
      { key: 'ending_doing_period' },
      { key: 'classroom' },
      {
        key: 'classroom_info',
        relatedModel: Classroom
      },
      { key: 'contents' },
      {
        key: 'contents_info',
        relatedModel: ContentList
      }
    ], {
      type: {
        infoKey: 'type_info',
        enumListKey: 'typeEnums',
        enums: [
          {
            label: 'گروهی',
            value: 'TEAM'
          },
          {
            label: 'تکی',
            value: 'SOLO'
          }
        ]
      }
    })
  }
}

class ProjectList extends Collection {
  model () {
    return Project
  }
}
export { Project, ProjectList }
