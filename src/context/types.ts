export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  accessToken: string
  userData: any
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  roles: string[]
  defaultRole: string
  dashletsPermission: {
    admin?: string[]
    teacher?: string[]
    student?: string[]
  }
  menuPermissions: {
    admin?: string[]
    teacher?: string[]
    student?: string[]
  }
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
