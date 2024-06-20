import { Collection, Model } from 'js-abstract-model'

class DonationCategory extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'thumbnail' },
      { key: 'description' }
    ])
  }
}

class DonationCategoryList extends Collection {
  model () {
    return DonationCategory
  }
}

export { DonationCategory, DonationCategoryList }
