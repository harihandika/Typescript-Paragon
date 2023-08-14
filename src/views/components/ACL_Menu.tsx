// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Box, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material'

// Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  '&:not(.Mui-focusVisible):hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.Mui-selected': {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemIcon-root, & .MuiTypography-root': {
      color: theme.palette.common.white
    }
  }
}))

const ACL_Menu = () => {
  // ** get local storage data
  const localData: any = window.localStorage.getItem('userData')
  const userData = JSON.parse(localData)
  const localDatarole: any = window.localStorage.getItem('role')
  const [role, setRole] = useState(localDatarole ? localDatarole : userData?.defaultRole)

  // ** User Role Handler Function - Set User values in the state
  const handleAclRole = (event: SelectChangeEvent) => {
    window.localStorage.setItem('role', event.target.value)

    window.location.href = window.location.href
  }

  useEffect(() => {
    setRole(localDatarole ? localDatarole : userData?.defaultRole)
  }, [localDatarole, userData])

  return (
    <Box sx={{ marginRight: '10px' }}>
      {/* ================= Form for selecting user role/ACL ================= */}
      <FormControl fullWidth={true}>
        <InputLabel id='acl-dropdown'>Role</InputLabel>
        <Select
          sx={{ height: '40px' }}
          label='Role'
          value={role}
          defaultValue=''
          labelId='acl-dropdown'
          onChange={handleAclRole}
        >
          {userData.roles.map((item: string, i: number) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default ACL_Menu
