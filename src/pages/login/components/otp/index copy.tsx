// ** React Imports
import React, { ChangeEvent, useState } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

//** Import useRef hook from React */

import { useRef } from 'react'
import OtpInputs from '../TwoFactor/Inputs'

//** Create Type For Props */
interface PropsType {
  errorMessage: string
  handleLogin: any
}

// this component for 6 specific input field
const OtpComponent = ({ errorMessage, handleLogin }: PropsType) => {
  // ** Reference of all input field

  const otp1 = useRef<any>()
  const otp2 = useRef<any>()
  const otp3 = useRef<any>()
  const otp4 = useRef<any>()
  const otp5 = useRef<any>()
  const otp6 = useRef<any>()

  // ** OTP Code

  const [otp, setOtp] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: ''
  })

  // ** Handle OTP Inputs and Set Value To the otp state

  const handleOTPInput = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /[0-9]/g
    const value = e.target.value
    if (regex.test(value)) {
      setOtp({ ...otp, [e.target.name]: value.slice(-1) })
      if (e.target.name === 'one') {
        otp2.current.focus()
      } else if (e.target.name === 'two') {
        otp3.current.focus()
      } else if (e.target.name === 'three') {
        otp4.current.focus()
      } else if (e.target.name === 'four') {
        otp5.current.focus()
      } else if (e.target.name === 'five') {
        otp6.current.focus()
      }
    }
  }

  // ** If user presses Backspace button, then the input will be empty and focus on the previous input
  const keyHandler = (e: KeyboardEvent) => {
    const value = e.key === 'Backspace' ? true : false
    setOtp({ ...otp, [e.currentTarget.name]: '' })
    if (value) {
      if (e.currentTarget.name === 'two') {
        otp1.current.focus()
      } else if (e.currentTarget.name === 'three') {
        otp2.current.focus()
      } else if (e.currentTarget.name === 'four') {
        otp3.current.focus()
      } else if (e.currentTarget.name === 'five') {
        otp4.current.focus()
      } else if (e.currentTarget.name === 'six') {
        otp5.current.focus()
      }
    }
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
        {/* ============== Login Screen Title With Subtitle ================ */}

        <Box sx={{ my: 6 }}>
          <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
            {`Welcome to ${themeConfig.templateName}! 👋🏻`}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Please enter the OTP code from app</Typography>
        </Box>

        {/* ================ Login Form With Inputs and Form Action Button ==================== */}

        <form noValidate autoComplete='off' onSubmit={e => handleLogin(e, otp)}>
          {/* ============== Email input ================ */}

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                gap: '10px'
              }}
            >
              <OtpInputs
                reference={otp1}
                name='one'
                value={otp?.one}
                handler={handleOTPInput}
                autoFocus={true}
                keyHandler={keyHandler}
              />
              <OtpInputs
                reference={otp2}
                name='two'
                value={otp?.two}
                handler={handleOTPInput}
                autoFocus={false}
                keyHandler={keyHandler}
              />
              <OtpInputs
                reference={otp3}
                name='three'
                value={otp?.three}
                handler={handleOTPInput}
                autoFocus={false}
                keyHandler={keyHandler}
              />
              <OtpInputs
                reference={otp4}
                name='four'
                value={otp?.four}
                handler={handleOTPInput}
                autoFocus={false}
                keyHandler={keyHandler}
              />
              <OtpInputs
                reference={otp5}
                name='five'
                value={otp?.five}
                handler={handleOTPInput}
                autoFocus={false}
                keyHandler={keyHandler}
              />
              <OtpInputs
                reference={otp6}
                name='six'
                value={otp?.six}
                handler={handleOTPInput}
                autoFocus={false}
                keyHandler={keyHandler}
              />
            </Box>
            {errorMessage && <FormHelperText sx={{ color: 'error.main' }}>{errorMessage}</FormHelperText>}
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
            Login
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default OtpComponent
