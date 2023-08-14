// ** React Imports
import React from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  email: yup.string().email().required()
})

interface PropsType {
  handleChange: any
  handleUsername: any
  errorMessage: string
  credentials: {
    username: string
    twoFactorOption: string
    password: string
    otp: string
    twoFactor: string
  }
}

const UsernameComponent = ({ handleChange, credentials, handleUsername, errorMessage }: PropsType) => {
  // ** Error Handler And Error Alert Handler

  const {
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Set How Login Page Left Side Illustration Will Display, Borderred or BorderLess

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
        {/* ============== Login Screen for Username Field Title With Subtitle ================ */}

        <Box sx={{ my: 6 }}>
          <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
            {`Welcome to ${themeConfig.templateName}! 👋🏻`}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Please sign-in to your account and start the adventure
          </Typography>
        </Box>

        {/* ================ Login screen for username Form With Inputs and Form Action Button ==================== */}

        <form noValidate autoComplete='off' onSubmit={handleUsername}>
          {/* ============== Email input ================ */}

          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
              name='email'
              required={true}
              autoFocus
              label='Username'
              value={credentials.username}
              onChange={handleChange}
              error={Boolean(errors.email)}
              placeholder='admin@vuexy.com'
            />

            {/* error message  */}
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
          >
            <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
          </Box>
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
            Next
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default UsernameComponent
