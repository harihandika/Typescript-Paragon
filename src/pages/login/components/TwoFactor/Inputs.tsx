import React from 'react'

// ** type for the props

interface PropsType {
  reference: any
  name: string
  value: string
  handler: any
  autoFocus: boolean
  keyHandler: any
}

// Otp code input
const OtpInputs = ({ reference, name, value, handler, autoFocus, keyHandler }: PropsType) => {
  return (
    <input
      ref={reference}
      type={'text'}
      name={name}
      required={true}
      value={value}
      onChange={handler}
      onKeyDown={keyHandler}
      placeholder='0'
      autoFocus={autoFocus}
      className='otpInputStyle'
    />
  )
}

export default OtpInputs
