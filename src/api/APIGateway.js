import SeoAPI from 'src/api/models/Seo.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/User.js'
import UnitAPI from 'src/api/models/Unit.js'
import WalletAPI from 'src/api/models/Wallet.js'
import InvoiceAPI from 'src/api/models/Invoice.js'
import SessionAPI from 'src/api/models/Session.js'
import ClassroomAPI from 'src/api/models/Classroom.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
import RegistrationAPI from 'src/api/models/Registration.js'
import UnitCategoryAPI from 'src/api/models/UnitCategory.js'
import SessionTemplateAPI from 'src/api/models/SessionTemplate.js'
import ClassroomRegistrationAPI from 'src/api/models/ClassroomRegistration.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  seo: new SeoAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  unit: new UnitAPI(),
  wallet: new WalletAPI(),
  invoice: new InvoiceAPI(),
  session: new SessionAPI(),
  classroom: new ClassroomAPI(),
  pageSetting: new PageSettingAPI(),
  registration: new RegistrationAPI(),
  unitCategory: new UnitCategoryAPI(),
  sessionTemplate: new SessionTemplateAPI(),
  classroomRegistration: new ClassroomRegistrationAPI()
}
