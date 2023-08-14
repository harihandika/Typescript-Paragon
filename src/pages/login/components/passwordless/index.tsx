// ** React Imports
import React from 'react'

// ** import bg color hook
import useBgColor from 'src/@core/hooks/useBgColor'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Alert } from '@mui/material'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const PasswordLess = () => {
  // ** bg color
  const bgColors = useBgColor()

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
        {/* ============== Message For Passwordless Login type ================ */}

        <Box sx={{ my: 6 }}>
          <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
            {`Welcome to ${themeConfig.templateName}! 👋🏻`}
          </Typography>

          <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
            <Typography sx={{ color: 'text.secondary' }}>
              Please check your email and click on the link to login
            </Typography>
          </Alert>
        </Box>
      </Box>
    </Box>
  )
}

export default PasswordLess
