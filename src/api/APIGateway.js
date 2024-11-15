import SeoAPI from 'src/api/models/Seo.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/User.js'
import PostAPI from 'src/api/models/Post.js'
import UnitAPI from 'src/api/models/Unit.js'
import TeamAPI from 'src/api/models/Team.js'
import TestAPI from 'src/api/models/Test.js'
import EventAPI from 'src/api/models/Event.js'
import MediaAPI from 'src/api/models/Media.js'
import NoticeAPI from 'src/api/models/Notice.js'
import TicketAPI from 'src/api/models/Ticket.js'
import WalletAPI from 'src/api/models/Wallet.js'
import BasketAPI from 'src/api/models/Basket.js'
import HadithAPI from 'src/api/models/Hadith.js'
import HashtagAPI from 'src/api/models/Hashtag.js'
import TestSetAPI from 'src/api/models/TestSet.js'
import InvoiceAPI from 'src/api/models/Invoice.js'
import PaymentAPI from 'src/api/models/Payment.js'
import SessionAPI from 'src/api/models/Session.js'
import ContentAPI from 'src/api/models/Content.js'
import ProjectAPI from 'src/api/models/Project.js'
import PackageAPI from 'src/api/models/Package.js'
import ProductAPI from 'src/api/models/Product.js'
import DonationAPI from 'src/api/models/Donation.js'
import QuestionApi from 'src/api/models/Question.js'
import DiscountAPI from 'src/api/models/Discount.js'
import ClassroomAPI from 'src/api/models/Classroom.js'
import AppSettingAPI from 'src/api/models/AppSetting.js'
import AnswerBookApi from 'src/api/models/AnswerBook.js'
import InstalmentAPI from 'src/api/models/Instalment.js'
import BasketItemAPI from 'src/api/models/BasketItem.js'
import AnswerSheetApi from 'src/api/models/AnswerSheet.js'
import TransactionAPI from 'src/api/models/Transaction.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
import PostCategoryAPI from 'src/api/models/PostCategory.js'
import MediaHashtagAPI from 'src/api/models/MediaHashtag.js'
import RegistrationAPI from 'src/api/models/Registration.js'
import UnitCategoryAPI from 'src/api/models/UnitCategory.js'
import ContentTopicAPI from 'src/api/models/ContentTopic.js'
import StoreCategoryAPI from 'src/api/models/StoreCategory.js'
import MediaCategoryAPI from 'src/api/models/MediaCategory.js'
import NoticeReceiverAPI from 'src/api/models/NoticeReceiver.js'
import QuestionChoiceApi from 'src/api/models/QuestionChoice.js'
import TicketCategoryAPI from 'src/api/models/TicketCategory.js'
import SessionTemplateAPI from 'src/api/models/SessionTemplate.js'
import TranscriptSheetAPI from 'src/api/models/TranscriptSheet.js'
import ContentCategoryAPI from 'src/api/models/ContentCategory.js'
import InstalmentOfferAPI from 'src/api/models/InstalmentOffer.js'
import ClassroomGraderAPI from 'src/api/models/ClassroomGraders.js'
import ClassroomLeadersAPI from 'src/api/models/ClassroomLeaders.js'
import DonationCategoryApi from 'src/api/models/DonationCategory.js'
import TeamRegistrationsAPI from 'src/api/models/TeamRegistrations.js'
import EventRegistrationApi from 'src/api/models/EventRegistration.js'
import ContentTopicCategoryAPI from 'src/api/models/ContentTopicCategory.js'
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
  notice: new NoticeAPI(),
  ticket: new TicketAPI(),
  wallet: new WalletAPI(),
  basket: new BasketAPI(),
  hadith: new HadithAPI(),
  hashtag: new HashtagAPI(),
  testSet: new TestSetAPI(),
  project: new ProjectAPI(),
  package: new PackageAPI(),
  product: new ProductAPI(),
  invoice: new InvoiceAPI(),
  payment: new PaymentAPI(),
  session: new SessionAPI(),
  content: new ContentAPI(),
  donation: new DonationAPI(),
  question: new QuestionApi(),
  discount: new DiscountAPI(),
  classroom: new ClassroomAPI(),
  appSetting: new AppSettingAPI(),
  answerBook: new AnswerBookApi(),
  instalment: new InstalmentAPI(),
  basketItem: new BasketItemAPI(),
  answerSheet: new AnswerSheetApi(),
  transaction: new TransactionAPI(),
  pageSetting: new PageSettingAPI(),
  registration: new RegistrationAPI(),
  postCategory: new PostCategoryAPI(),
  unitCategory: new UnitCategoryAPI(),
  contentTopic: new ContentTopicAPI(),
  mediaHashtag: new MediaHashtagAPI(),
  storeCategory: new StoreCategoryAPI(),
  mediaCategory: new MediaCategoryAPI(),
  noticeReceiver: new NoticeReceiverAPI(),
  ticketCategory: new TicketCategoryAPI(),
  questionChoice: new QuestionChoiceApi(),
  transcriptSheet: new TranscriptSheetAPI(),
  sessionTemplate: new SessionTemplateAPI(),
  contentCategory: new ContentCategoryAPI(),
  instalmentOffer: new InstalmentOfferAPI(),
  classroomGrader: new ClassroomGraderAPI(),
  classroomLeaders: new ClassroomLeadersAPI(),
  donationCategory: new DonationCategoryApi(),
  teamRegistrations: new TeamRegistrationsAPI(),
  eventRegistration: new EventRegistrationApi(),
  contentTopicCategory: new ContentTopicCategoryAPI(),
  classroomRegistration: new ClassroomRegistrationAPI(),
  projectAttendanceSheets: new ProjectAttendanceSheetsAPI(),
  sessionAttendanceSheets: new SessionAttendanceSheetsAPI()
}
