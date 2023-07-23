import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'
// import { UnitCategory } from 'src/models/UnitCategory.js'

class Unit extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'category' },
      {
        key: 'category_info'
        // relatedModel: UnitCategory
      },
      { key: 'title' },
      { key: 'rules' },
      { key: 'codes' }
    ])
  }
}

class UnitList extends Collection {
  model () {
    return Unit
  }
}
export { Unit, UnitList }
