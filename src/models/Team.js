import { User } from 'src/models/User.js'
import { Collection, Model } from 'js-abstract-model'

class Team extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'capacity' },
      { key: 'used_capacity' },
      { key: 'description' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'join_status' },
      { key: 'classroom' },
      { key: 'leader' },
      {
        key: 'leader_info',
        relatedModel: User
      },
      { key: 'creation_time' },
      { key: 'last_modification_time' }
    ], {
      join_status: {
        infoKey: 'join_status_info',
        enumListKey: 'join_statusEnums',
        enums: [
          {
            label: 'فعال',
            value: 'ENABLED'
          },
          {
            label: 'ظرفیت تکمیل',
            value: 'FULL'
          },
          {
            label: 'عضویت توسط ادمین',
            value: 'DISABLED'
          },
          {
            label: 'عضوهستید',
            value: 'JOINED'
          }
        ]
      }
    })
  }
}

class TeamList extends Collection {
  model () {
    return Team
  }
}

export { Team, TeamList }
