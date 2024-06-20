import { Collection, Model } from 'js-abstract-model'
import { DonationCategory } from 'src/models/DonationCategory.js'

class Donation extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'summary' },
      { key: 'thumbnail' },
      { key: 'category' },
      {
        key: 'category_info',
        relatedModel: DonationCategory
      }
    ])

    if (!this.thumbnail) {
      this.thumbnail = '/img/sample-post-thumbnail.jpg'
    }
  }
}

class DonationList extends Collection {
  model () {
    return Donation
  }
}

export { Donation, DonationList }
