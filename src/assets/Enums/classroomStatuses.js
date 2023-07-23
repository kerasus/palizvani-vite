const classroomStatuses = [
  { label: 'منتشر نشده', value: 'NOT_PUBLISHED_YET' },
  { label: 'قبل از مرحله پیش ثبت نام', value: 'BEFORE_ENROLLMENT_PERIOD' },
  { label: 'مرحله پیش ثبت نام', value: 'IN_ENROLLMENT_PERIOD' },
  { label: 'قبل از مرحله ثبت نام', value: 'BEFORE_REGISTRATION_PERIOD' },
  { label: 'مرحله ثبت نام', value: 'IN_REGISTRATION_PERIOD' },
  { label: 'قبل از مرحله حذف و اضافه', value: 'BEFORE_DROP_ADD_PERIOD' },
  { label: 'مرحله حذف و اضافه', value: 'IN_DROP_ADD_PERIOD' },
  { label: 'جاری', value: 'ONGOING' },
  { label: 'پایان یافته', value: 'FINISHED' }
]

export default classroomStatuses
