export const server_url = 'https://paragonsmsapi.smartage.io/paragon-api/auth'

export default {
  username_verify: `${server_url}/login`,
  credential_login: `${server_url}/credential-login`,
  passwordless_login: `${server_url}/login-passwordless`,
  verify_passwordless: `${server_url}/token-passwordless-login`,
  generate_qr: `${server_url}/verify-google-authenticator-otp`,
  otp_login: `${server_url}/verify-otp-login`,
  google_login: `${server_url}/qr-login`,
  verify_google_login: `${server_url}/verify-google-authenticator-option`,
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshToken: `${server_url}/refresh-token`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
