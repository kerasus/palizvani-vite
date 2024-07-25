import { Model, Collection } from 'js-abstract-model'

class Hadith extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'persian_text' },
      { key: 'arabian_text' },
      { key: 'narrator' },
      { key: 'source' },
      { key: 'publish_date' }
    ])
  }
}

class HadithList extends Collection {
  model() {
    return Hadith
  }
}

export { Hadith, HadithList }
