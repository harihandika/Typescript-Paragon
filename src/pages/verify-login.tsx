// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** import bg color hook
import useBgColor from 'src/@core/hooks/useBgColor'

// ** import next router
import { useRouter } from 'next/router'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Alert } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** import apis
import endPoint from 'src/configs/auth'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import axios from 'axios'

// import auth
import { useAuth } from 'src/hooks/useAuth'

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

const VerifyLogin = () => {
  // ** router
  const router = useRouter()

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** bg color
  const bgColors = useBgColor()

  // ** Hooks
  const auth = useAuth()

  // ** import navigation from router

  // ** Vars
  const { skin } = settings

  // ** Set How Login Page Left Side Illustration Will Display, Borderred or BorderLess

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  // show to client what is happending
  const [alertMessage, setAlertMessage]: any = useState('')

  useEffect(() => {
    // hit the url to verify the passwordless authentication
    axios
      .get(endPoint.verify_passwordless, {
        headers: { Authorization: `Bearer ${localStorage.getItem('secretToken')}` }
      })
      .then(res => {
        if (res.data.code === 201) {
          // if user is valid
          auth.login({ accessToken: res.data.data.accessToken, userData: res.data?.data.user })
          setTimeout(() => {
            router.push('/', undefined, { shallow: true })
          }, 2000)
        } else {
          // else
          setAlertMessage(res.data.message)
          setTimeout(() => {
            router.push('/login', undefined, { shallow: true })
          }, 2000)
        }
        localStorage.removeItem('secretToken')
      })
      .catch(() => {
        // if errors
        setAlertMessage('Invalid user')
        localStorage.removeItem('secretToken')
        setTimeout(() => {
          router.push('/login', undefined, { shallow: true })
        }, 2000)
      })
  }, [auth])

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {alertMessage ? (
        <>
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
              <LoginIllustration
                alt='login-illustration'
                src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
              />
              <FooterIllustrationsV2 />
            </Box>
          ) : null}

          {/* ============================ Login Page Right Side Box With Login Form ========================= */}

          <RightWrapper>
            <Box
              sx={{
                p: [6, 12],
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                {/* ============== Login Screen Title With Subtitle ================ */}

                <Box sx={{ my: 6 }}>
                  <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
                    <Typography sx={{ color: 'text.secondary' }}>{alertMessage}</Typography>
                  </Alert>
                </Box>
              </Box>
            </Box>
          </RightWrapper>
        </>
      ) : null}
    </Box>
  )
}

VerifyLogin.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

VerifyLogin.guestGuard = true

export default VerifyLogin
