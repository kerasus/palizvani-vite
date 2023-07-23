import SeoAPI from 'src/api/models/Seo.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/User.js'
import UnitAPI from 'src/api/models/Unit.js'
import ClassroomAPI from 'src/api/models/Classroom.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
import UnitCategoryAPI from 'src/api/models/UnitCategory.js'
import ClassroomRegistrationAPI from 'src/api/models/ClassroomRegistration.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  seo: new SeoAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  unit: new UnitAPI(),
  classroom: new ClassroomAPI(),
  pageSetting: new PageSettingAPI(),
  unitCategory: new UnitCategoryAPI(),
  classroomRegistration: new ClassroomRegistrationAPI()
}
