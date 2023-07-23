/* eslint-disable camelcase,prefer-const */
import { Model } from 'js-abstract-model'
// import API_ADDRESS from '../api/Addresses'

class User extends Model {
  constructor (data) {
    super(data, [
      // {
      //   key: 'baseRoute',
      //   default: API_ADDRESS.user.base
      // },
      { key: 'id' },
      { key: 'user_id' },
      { key: 'creation_time' },
      { key: 'email' },
      { key: 'email_verified' },
      { key: 'failed_login_attempts' },
      { key: 'groups' },
      { key: 'is_active' },
      { key: 'is_delete' },
      { key: 'is_locked_out' },
      { key: 'is_superuser' },
      { key: 'last_login' },
      { key: 'last_modification_time' },
      { key: 'lockout_end_date' },
      { key: 'mobile_number' },
      { key: 'mobile_number_verified' },
      { key: 'national_code' },
      { key: 'nickname' },
      { key: 'firstname' },
      { key: 'lastname' },
      { key: 'father_name' },
      { key: 'password' },
      { key: 'phone_number' },
      { key: 'phone_number_verified' },
      { key: 'potential_dates' },
      { key: 'roles' },
      { key: 'gender' },
      { key: 'marital_status' },
      { key: 'address' },
      { key: 'moballegh_info' },
      { key: 'user_permissions' }

    ])

    if (this.user_id !== null) {
      this.id = this.user_id
    }
  }

  fullname () {
    const firstname = this.firstname ? this.firstname : ''
    const lastname = this.lastname ? this.lastname : ''
    return firstname + ' ' + lastname
  }

  hasRole (targetName) {
    if (!this.roles) {
      return false
    }
    return !!this.roles.find(role => role === targetName)
  }

  isSuperUser () {
    return this.hasRole('superuser')
  }

  isAdmin () {
    return this.hasRole('admin')
  }

  isTeamLeader () {
    return this.hasRole('team_leader')
  }

  isEducationalDepartmentHead () {
    return this.hasRole('educational_department_head')
  }

  isResearchDepartmentHead () {
    return this.hasRole('research_department_head')
  }

  isPublicRelationsDepartmentHead () {
    return this.hasRole('public_relations_department_head')
  }

  isDocumentaryDepartmentHead () {
    return this.hasRole('documentary_department_head')
  }

  isHumanResourceDepartmentHead () {
    return this.hasRole('human_resource_department_head')
  }

  isFinancialDepartmentHead () {
    return this.hasRole('financial_department_head')
  }

  isCulturalDepartmentHead () {
    return this.hasRole('cultural_department_head')
  }

  isMediumDepartmentHead () {
    return this.hasRole('medium_department_head')
  }

  isGrader () {
    return this.hasRole('grader')
  }

  isProfessor () {
    return this.hasRole('professor')
  }

  isUser () {
    return this.hasRole('user')
  }

  canSeeUserProfilePanel () {
    return this.isUser()
  }

  canSeeAdminPanel () {
    return (
      this.isSuperUser() ||
      this.isAdmin() ||
      this.isTeamLeader() ||
      this.isEducationalDepartmentHead() ||
      this.isResearchDepartmentHead() ||
      this.isPublicRelationsDepartmentHead() ||
      this.isDocumentaryDepartmentHead() ||
      this.isHumanResourceDepartmentHead() ||
      this.isFinancialDepartmentHead() ||
      this.isCulturalDepartmentHead() ||
      this.isMediumDepartmentHead() ||
      this.isGrader() ||
      this.isProfessor()
    )
  }
}

export { User }
