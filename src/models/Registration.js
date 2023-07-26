import { User } from 'src/models/User.js'
import { Classroom } from 'src/models/Classroom.js'
import { Model, Collection } from 'js-abstract-model'

class Registration extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      { key: 'classroom' },
      {
        key: 'classroom_info',
        relatedModel: Classroom
      },
      { key: 'status' }
    ])

    this.statusEnums = [
      {
        label: 'ثبت نام شده',
        value: 'REGISTERED'
      }
    ]

    this.loadStatusInfo()
  }

  loadStatusInfo () {
    const target = this.statusEnums.find(type => type.value === this.status)
    if (!target) {
      this.status_info = {
        label: null,
        value: null
      }
    } else {
      this.status_info = target
    }
  }
}

class RegistrationList extends Collection {
  model () {
    return Registration
  }
}
export { Registration, RegistrationList }
