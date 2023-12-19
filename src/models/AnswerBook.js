import { User } from 'src/models/User.js'
import { Test } from 'src/models/Test.js'
import { Collection, Model } from 'js-abstract-model'
import { AnswerSheetList } from 'src/models/AnswerSheet.js'

class AnswerBook extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'attachment' },
      { key: 'attending_end_time' },
      { key: 'attending_start_time' },
      { key: 'creation_time' },
      { key: 'creator' },
      {
        key: 'creator_info',
        relatedModel: User
      },
      { key: 'owner' },
      {
        key: 'owner_info',
        relatedModel: User
      },
      { key: 'test' },
      {
        key: 'test_info',
        relatedModel: Test
      },
      { key: 'duration' },
      { key: 'grader' },
      { key: 'grader_description' },
      { key: 'grader_info' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'last_modification_time' },
      { key: 'objection_request' },
      { key: 'objection_result' },
      { key: 'objection_time' },
      {
        key: 'answer_sheet_info',
        relatedModel: AnswerSheetList
      },
      { key: 'overall_answer_text' },
      { key: 'overall_answer_attachment' },
      { key: 'registration' },
      { key: 'registration_info' },
      { key: 'server_time' },
      { key: 'attending_start_time' },
      { key: 'status' },
      {
        key: 'is_enabled_attending',
        default: false
      },
      {
        key: 'is_enabled_continuing',
        default: false
      },
      {
        key: 'is_enabled_objecting',
        default: false
      },
      {
        key: 'is_enabled_viewing',
        default: false
      }
    ], {
      status: {
        infoKey: 'status_info',
        enumListKey: 'statusEnums',
        enums: [
          {
            label: 'جاری',
            value: 'ONGOING'
          },
          {
            label: 'حذف شده',
            value: 'DELETED'
          },
          {
            label: 'ایجاد شده',
            value: 'CREATED'
          },
          {
            label: 'ارسال نشده',
            value: 'FETCHED'
          },
          {
            label: 'ارسال شده',
            value: 'SUBMITTED'
          },
          {
            label: 'در حال تصحیح',
            value: 'GRADING'
          },
          {
            label: 'غیر قابل تصحیح',
            value: 'UNGRADABLE'
          },
          {
            label: 'تصحیح شده',
            value: 'GRADED'
          },
          {
            label: 'اعتراض شده',
            value: 'OBJECTED'
          },
          {
            label: 'نهایی شده',
            value: 'FINALIZED'
          }
        ]
      }
    })
  }
}

class AnswerBookList extends Collection {
  model () {
    return AnswerBook
  }
}

export { AnswerBook, AnswerBookList }
