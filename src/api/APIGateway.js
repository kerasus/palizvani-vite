import SeoAPI from 'src/api/models/Seo.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/User.js'
import PostAPI from 'src/api/models/Post.js'
import UnitAPI from 'src/api/models/Unit.js'
import MediaAPI from 'src/api/models/Media.js'
import TicketAPI from 'src/api/models/Ticket.js'
import WalletAPI from 'src/api/models/Wallet.js'
import InvoiceAPI from 'src/api/models/Invoice.js'
import PaymentAPI from 'src/api/models/Payment.js'
import SessionAPI from 'src/api/models/Session.js'
import ContentAPI from 'src/api/models/Content.js'
import ClassroomAPI from 'src/api/models/Classroom.js'
import InstalmentAPI from 'src/api/models/Instalment.js'
import TransactionAPI from 'src/api/models/Transaction.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
import PostCategoryAPI from 'src/api/models/PostCategory.js'
import MediaHashtagAPI from 'src/api/models/MediaHashtag.js'
import RegistrationAPI from 'src/api/models/Registration.js'
import UnitCategoryAPI from 'src/api/models/UnitCategory.js'
import MediaCategoryAPI from 'src/api/models/MediaCategory.js'
import TicketCategoryAPI from 'src/api/models/TicketCategory.js'
import SessionTemplateAPI from 'src/api/models/SessionTemplate.js'
import ContentCategoryAPI from 'src/api/models/ContentCategory.js'
import InstalmentOfferAPI from 'src/api/models/InstalmentOffer.js'
import ClassroomRegistrationAPI from 'src/api/models/ClassroomRegistration.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  seo: new SeoAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  unit: new UnitAPI(),
  post: new PostAPI(),
  media: new MediaAPI(),
  ticket: new TicketAPI(),
  wallet: new WalletAPI(),
  invoice: new InvoiceAPI(),
  payment: new PaymentAPI(),
  session: new SessionAPI(),
  content: new ContentAPI(),
  classroom: new ClassroomAPI(),
  instalment: new InstalmentAPI(),
  transaction: new TransactionAPI(),
  pageSetting: new PageSettingAPI(),
  registration: new RegistrationAPI(),
  postCategory: new PostCategoryAPI(),
  unitCategory: new UnitCategoryAPI(),
  mediaHashtag: new MediaHashtagAPI(),
  mediaCategory: new MediaCategoryAPI(),
  ticketCategory: new TicketCategoryAPI(),
  sessionTemplate: new SessionTemplateAPI(),
  contentCategory: new ContentCategoryAPI(),
  instalmentOffer: new InstalmentOfferAPI(),
  classroomRegistration: new ClassroomRegistrationAPI()
}
