const classroomStatuses = [
  { label: 'منتشر نشده', value: 'NOT_PUBLISHED_YET', showInUserFilters: false },
  { label: 'قبل از مرحله پیش ثبت نام', value: 'BEFORE_ENROLLMENT_PERIOD', showInUserFilters: false },
  { label: 'مرحله پیش ثبت نام', value: 'IN_ENROLLMENT_PERIOD', showInUserFilters: true },
  { label: 'قبل از مرحله ثبت نام', value: 'BEFORE_REGISTRATION_PERIOD', showInUserFilters: false },
  { label: 'مرحله ثبت نام', value: 'IN_REGISTRATION_PERIOD', showInUserFilters: true },
  { label: 'قبل از مرحله حذف و اضافه', value: 'BEFORE_DROP_ADD_PERIOD', showInUserFilters: false },
  { label: 'مرحله حذف و اضافه', value: 'IN_DROP_ADD_PERIOD', showInUserFilters: true },
  { label: 'جاری', value: 'ONGOING', showInUserFilters: true },
  { label: 'پایان یافته', value: 'FINISHED', showInUserFilters: true }
]

export default classroomStatuses
