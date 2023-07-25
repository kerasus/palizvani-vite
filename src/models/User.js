import { Collection, Model } from 'js-abstract-model'

class User extends Model {
  constructor (data) {
    super(data, [
      // {
      //   key: 'baseRoute',
      //   default: API_ADDRESS.user.base
      // },
      { key: 'id' },
      { key: 'firstname' },
      { key: 'lastname' },
      { key: 'gender' },
      { key: 'marital_status' },
      { key: 'birthdate' },
      { key: 'national_code' },
      { key: 'picture' },
      { key: 'has_seminary_education' },
      { key: 'last_academic_degree' },
      { key: 'last_academic_degree_field' },
      { key: 'last_academy_name' },
      { key: 'educational_status' },
      { key: 'phone_number' },
      { key: 'phone_number_verified' },
      { key: 'on_social_network_mobile_number' },
      { key: 'on_call_mobile_number' },
      { key: 'email' },
      { key: 'email_verified' },
      { key: 'is_abroad_birth_address' },
      { key: 'birth_country' },
      { key: 'birth_province' },
      { key: 'birth_city' },
      { key: 'is_abroad_living_address' },
      { key: 'living_country' },
      { key: 'living_province' },
      { key: 'living_city' },
      { key: 'living_address' },
      { key: 'living_postal_code' },
      { key: 'living_address_additional_info' },
      { key: 'is_locked_out' },
      { key: 'failed_login_attempts' },
      { key: 'lockout_end_date' },
      { key: 'creation_time' },
      { key: 'last_modification_time' },
      { key: 'is_active' },
      { key: 'is_deleted' },
      { key: 'roles' },

      { key: 'user_id' },
      { key: 'groups' },
      { key: 'is_delete' },
      { key: 'is_superuser' },
      { key: 'last_login' },
      { key: 'mobile_number' },
      { key: 'mobile_number_verified' },
      { key: 'nickname' },
      { key: 'father_name' },
      { key: 'password' },
      { key: 'potential_dates' },
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

class UserList extends Collection {
  model () {
    return User
  }
}

export { User, UserList }
