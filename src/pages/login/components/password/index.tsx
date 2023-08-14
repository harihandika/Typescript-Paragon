// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
interface PropsType {
  handleLogin: any
  errorMessage: string
}

const PasswordComponent = ({ handleLogin, errorMessage }: PropsType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  const handleChange = (e: any) => {
    setPassword(e.target.value)
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
        {/* ============== Login with credential Screen Title With Subtitle ================ */}

        <Box sx={{ my: 6 }}>
          <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
            {`Welcome to ${themeConfig.templateName}! 👋🏻`}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Please enter your password</Typography>
        </Box>

        {/* ================ Login with credential Form With Inputs and Form Action Button ==================== */}

        <form noValidate autoComplete='off' onSubmit={e => handleLogin(e, password)}>
          {/* =================== Password input =============== */}
          <FormControl fullWidth sx={{ mb: 1.5 }}>
            <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
            <OutlinedInput
              value={password}
              label='Password'
              name='password'
              onChange={handleChange}
              id='auth-login-v2-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                  </IconButton>
                </InputAdornment>
              }
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
          >
            <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
          </Box>
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default PasswordComponent
