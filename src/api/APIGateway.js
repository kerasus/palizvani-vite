import SeoAPI from 'src/api/models/Seo.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/User.js'
import PostAPI from 'src/api/models/Post.js'
import UnitAPI from 'src/api/models/Unit.js'
import TeamAPI from 'src/api/models/Team.js'
import TestAPI from 'src/api/models/Test.js'
import EventAPI from 'src/api/models/Event.js'
import MediaAPI from 'src/api/models/Media.js'
import TicketAPI from 'src/api/models/Ticket.js'
import WalletAPI from 'src/api/models/Wallet.js'
import TestSetAPI from 'src/api/models/TestSet.js'
import InvoiceAPI from 'src/api/models/Invoice.js'
import PaymentAPI from 'src/api/models/Payment.js'
import SessionAPI from 'src/api/models/Session.js'
import ContentAPI from 'src/api/models/Content.js'
import ProjectAPI from 'src/api/models/Project.js'
import QuestionApi from 'src/api/models/Question.js'
import ClassroomAPI from 'src/api/models/Classroom.js'
import AnswerBookApi from 'src/api/models/AnswerBook.js'
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
import ClassroomGraderAPI from 'src/api/models/ClassroomGraders.js'
import ClassroomLeadersAPI from 'src/api/models/ClassroomLeaders.js'
import TeamRegistrationsAPI from 'src/api/models/TeamRegistrations.js'
import EventRegistrationApi from 'src/api/models/EventRegistration.js'
import ClassroomRegistrationAPI from 'src/api/models/ClassroomRegistration.js'
import ProjectAttendanceSheetsAPI from 'src/api/models/ProjectAttendanceSheets.js'
import SessionAttendanceSheetsAPI from 'src/api/models/SessionAttendanceSheets.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  seo: new SeoAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  unit: new UnitAPI(),
  post: new PostAPI(),
  team: new TeamAPI(),
  test: new TestAPI(),
  event: new EventAPI(),
  media: new MediaAPI(),
  ticket: new TicketAPI(),
  wallet: new WalletAPI(),
  testSet: new TestSetAPI(),
  project: new ProjectAPI(),
  invoice: new InvoiceAPI(),
  payment: new PaymentAPI(),
  session: new SessionAPI(),
  content: new ContentAPI(),
  question: new QuestionApi(),
  classroom: new ClassroomAPI(),
  answerBook: new AnswerBookApi(),
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
  classroomGrader: new ClassroomGraderAPI(),
  classroomLeaders: new ClassroomLeadersAPI(),
  teamRegistrations: new TeamRegistrationsAPI(),
  eventRegistration: new EventRegistrationApi(),
  classroomRegistration: new ClassroomRegistrationAPI(),
  projectAttendanceSheets: new ProjectAttendanceSheetsAPI(),
  sessionAttendanceSheets: new SessionAttendanceSheetsAPI()
}
