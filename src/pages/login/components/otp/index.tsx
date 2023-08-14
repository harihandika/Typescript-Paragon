// ** React Imports
import React, { ChangeEvent, useState } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { InputLabel } from '@mui/material'
import { OutlinedInput } from '@mui/material'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

//** Create Type For Props */
interface PropsType {
  errorMessage: string
  handleLogin: any
}

const OtpComponent = ({ errorMessage, handleLogin }: PropsType) => {
  // ** OTP Code

  const [otp, setOtp] = useState('')

  // ** Handle OTP Inputs and Set Value To the otp state

  const handleOTPInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setOtp(value)
  }

  return (
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
        {/* ============== Login with one time password Screen Title With Subtitle ================ */}

        <Box sx={{ my: 6 }}>
          <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
            {`Welcome to ${themeConfig.templateName}! 👋🏻`}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Please enter the OTP code from app</Typography>
        </Box>

        {/* ================ Login with one time password Form With Inputs and Form Action Button ==================== */}

        <form noValidate autoComplete='off' onSubmit={e => handleLogin(e, otp)}>
          {/* =================== Password input =============== */}
          <FormControl fullWidth sx={{ mb: 1.5 }}>
            <InputLabel htmlFor='auth-login-v2-password'>Enter OTP</InputLabel>
            <OutlinedInput
              value={otp}
              label='OTP Code'
              name='otp'
              onChange={handleOTPInput}
              id='auth-login-v2-password'
            />
            {/* =================== Display Error Messages Here ================= */}
            {errorMessage && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errorMessage}
              </FormHelperText>
            )}
          </FormControl>
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          ></Box>
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
            Verify
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default OtpComponent
