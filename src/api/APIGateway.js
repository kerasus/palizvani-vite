import SeoAPI from 'src/api/models/Seo.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/User.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  seo: new SeoAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  pageSetting: new PageSettingAPI()
}
