import { User } from 'src/models/User.js'
import { UnitList } from 'src/models/Unit.js'
import { Model, Collection } from 'js-abstract-model'

class UnitCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      {
        key: 'units_info',
        relatedModel: UnitList
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' }
    ])
  }
}

class UnitCategoryList extends Collection {
  model () {
    return UnitCategory
  }
}
export { UnitCategory, UnitCategoryList }
