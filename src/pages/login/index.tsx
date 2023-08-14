// ** React Imports
import { FormEvent, ReactNode, useState } from 'react'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import { useAuth } from 'src/hooks/useAuth'

// ** import apis
import endPoint, { server_url } from 'src/configs/auth'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Import selector from redux

import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { useDispatch } from 'react-redux'
import { handleTwoFactorOption, handleUserName } from 'src/store/apps/login'

// ** import Components
import UsernameComponent from './username'
import TwoFactor from './components/TwoFactor'
import PasswordComponent from './components/password'
import OtpComponent from './components/otp'
import PasswordLess from './components/passwordless'
import axios from 'axios'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LoginPage = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** import navigation from router

  // ** Vars
  const { skin } = settings

  // ** Redux Store
  const { loginCredentials } = useSelector((state: RootState) => state)

  // ** Set Error Message For Input
  const [errorMessage, setErrorMessage] = useState('')

  // ** Dispatch
  const dispatch = useDispatch()

  // ** bearer token
  const [token, setToken] = useState('')

  // ** Login Form Username On Change Function, Username will store in redux
  const handleChange = (event: any) => {
    if (event.target.name === 'password') {
      dispatch(handleUserName({ password: event.target.value as string }))
    } else {
      dispatch(handleUserName({ username: event.target.value as string }))
    }
  }

  // ** Set How Login Page Left Side Illustration Will Display, Borderred or BorderLess

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  // ** Login Component Will Appear Based On This State's Value

  const [loginComponent, setLoginComponent] = useState('')

  // ** handle Username Component action

  // ** Hooks
  const auth = useAuth()

  // ** Check Username exist or not then redirect to the authentication page,
  // ** for redirect to some authentication page we may need handling some api also
  const handleUsername = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    await axios
      .post(
        endPoint.username_verify,
        {
          emailOrUsername: loginCredentials.username
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.success) {
          // set temporary secret token for the verification
          setToken(res.data.data.authenticationSecret)

          // dispatch the two factor option for the user and store it for the next steps
          dispatch(handleTwoFactorOption({ twoFactorOption: res.data.data.twoFactorOption }))

          // if user's two factor option is credential
          if (res.data.data.twoFactorOption === 'credential') {
            setLoginComponent('credentials')
          }

          // if user's two factor option is passwordless
          else if (res.data.data.twoFactorOption === 'passwordless') {
            // ** if user's two factor option is passwordless, it will sent a otp code to the user email
            axios
              .post(
                `${endPoint.passwordless_login}`,
                {},
                {
                  headers: { Authorization: `Bearer ${res.data.data.authenticationSecret}` }
                }
              )
              .then(() => {
                localStorage.setItem('secretToken', res.data.data.authenticationSecret)
                setLoginComponent('passwordless')
              })
              .catch(() => {
                setErrorMessage('Something went wrong')
              })
          }

          // if user's two factor option is one time password
          else if (res.data.data.twoFactorOption === 'one time password') {
            // ** if user's two factor option is one time password, it will sent a otp code to the user email
            axios
              .get(`${server_url}/send-otp?email=${loginCredentials.username}`)
              .then(() => {
                setLoginComponent('otp')
              })
              .catch(() => {
                setErrorMessage('Something went wrong')
              })
          }

          // if user's two factor option is two factor
          else if (res.data.data.twoFactorOption === 'two factor') {
            // ** if user's two factor option is two factor, it will sent a otp code to the user auth app
            setLoginComponent('2FA')
          }

          // if user's there is no two factor option set for the user
          else {
            setErrorMessage(`User don't have any two factor option`)
          }
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong')
      })
  }

  // ** Login Handler for login to the app
  const handleLogin = async (e: FormEvent, value: any) => {
    e.preventDefault()
    setErrorMessage('')

    // if the users two factor option is credential we will find a field for type the passwrod to complete the verification
    if (loginCredentials.twoFactorOption === 'credential') {
      await axios
        .post(
          endPoint.credential_login,
          {
            password: value
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(res => {
          if (res.data.code === 201) {
            // authenticate in AuthContext.tsx
            auth.login({ accessToken: res.data.data.accessToken, userData: res.data?.data.user })
          } else {
            setErrorMessage(res.data.message)
          }
        })
        .catch(err => {
          setErrorMessage(err.response.data.message[0])
        })
    }

    // if the users two factor option is two factor we will find a field for type the otp code to complete the verification
    else if (loginCredentials?.twoFactorOption === 'two factor') {
      await axios
        .post(
          endPoint.verify_google_login,
          {
            otp: value
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(res => {
          if (res.data.code === 201) {
            // authenticate in AuthContext.tsx
            auth.login({ accessToken: res.data.data.accessToken, userData: res.data?.data.user })
          } else {
            setErrorMessage('Something went wrong')
          }
        })
        .catch(() => {
          setErrorMessage('Something went wrong')
        })
    }

    // if the users two factor option is one time password we will find a field for type the otp code to complete the verification
    else if (loginCredentials?.twoFactorOption === 'one time password') {
      await axios
        .post(
          endPoint.otp_login,
          {
            otp: value
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(res => {
          if (res.data.code === 201) {
            // authenticate in AuthContext.tsx
            auth.login({ accessToken: res.data?.data.accessToken, userData: res.data?.data.user })
            setErrorMessage(res.data.message)
          } else {
            setErrorMessage('Something went wrong')
          }
        })
        .catch(err => {
          setErrorMessage(err.response.data.message[0])
        })
    }
  }

  // ** return components based on their two factor authentication option
  const getLoginComponents = () => {
    if (loginComponent === '2FA') {
      return <TwoFactor handleLogin={handleLogin} errorMessage={errorMessage} />
    } else if (loginComponent === 'credentials') {
      return <PasswordComponent handleLogin={handleLogin} errorMessage={errorMessage} />
    } else if (loginComponent === 'otp') {
      return <OtpComponent handleLogin={handleLogin} errorMessage={errorMessage} />
    } else if (loginComponent === 'passwordless') {
      return <PasswordLess />
    } else {
      return (
        <UsernameComponent
          handleChange={handleChange}
          credentials={loginCredentials}
          handleUsername={handleUsername}
          errorMessage={errorMessage}
        />
      )
    }
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {/* ========================= Login Page Left Side Box Where Some Illustrations Added ======================= */}

      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      {/* ============================ Login Page Right Side Box With Athentication Type Component ========================= */}

      <RightWrapper>{getLoginComponents()}</RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
