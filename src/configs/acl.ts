import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: any
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: any) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  const localData: any = window.localStorage.getItem('userData')
  const userData = JSON.parse(localData)

  // ** If user is admin
  if (role === 'admin') {
    can('manage', 'dashboard')

    // dashlets permissions for admin
    userData?.dashletsPermission?.admin.map((item: string) => {
      return can('read', item)
    })

    // menu item permissions for admin
    userData?.menuPermissions.admin.map((item: string) => {
      return can('read', item)
    })

    // can apply all crud actions to users
    can(['manage'], 'users')
  }

  // ** if user is teacher
  else if (role === 'teacher') {
    can('manage', 'dashboard')

    // dashlets permission form teacher
    userData?.dashletsPermission?.teacher.map((item: string) => {
      return can('read', item)
    })

    // menu item permissions for teacher
    userData?.menuPermissions.teacher.map((item: string) => {
      return can('read', item)
    })

    // can apply read actions to users
    can('read', 'users')
  }

  // ** if user is student
  else if (role === 'student') {
    can('manage', 'dashboard')

    // dashlets permissions from student
    userData?.dashletsPermission?.student.map((item: string) => {
      return can('read', item)
    })

    // menu item permissions for student
    userData?.menuPermissions.student.map((item: string) => {
      return can('read', item)
    })
  } else {
    return can('manage', 'all')
  }

  //check
  console.log(subject)

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
