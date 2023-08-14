// ** React Imports
import React from 'react'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const QrScan = () => {
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
        <Box sx={{ my: 6 }}>
          {/* Previous content of scan qr code in top */}
          <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', textAlign: 'center', lineHeight: 1.385 }}>
            {`Welcome to ${themeConfig.templateName}! 👋🏻`}
          </Typography>

          {/* this is the image for scan the qr code */}

          <div className='w-full flex justify-center py-5'>
            <img
              alt='QR Code'
              src='data:image/png;base64,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'
            />
          </div>

          {/* content after scan qr code image in bottom */}
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>Please scan the QR code</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default QrScan
