export const TOKEN_URL =
  "https://us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com/oauth2/token";


const COGNITO_DOMAIN =
  "https://us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com";

export const CLIENT_ID =
  "5d8uo8cktjc6ukhnps699nj68i";

/* Redirect after login */
export const REDIRECT_SIGN_IN =
  "https://iris-iot-react.netlify.app/Dashboard";

/* Redirect after logout */
const REDIRECT_SIGN_OUT =
  "https://iris-iot-react.netlify.app";

/* OAuth Scopes */
const SCOPES =
  "openid+email+profile";

/* LOGIN URL */
export const loginUrl =
  `${COGNITO_DOMAIN}/login` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&scope=${SCOPES}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_SIGN_IN)}`;

/* SIGNUP URL */
export const signupUrl =
  `${COGNITO_DOMAIN}/signup` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&scope=${SCOPES}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_SIGN_IN)}`;

/* LOGOUT URL */
export const logoutUrl =
  `${COGNITO_DOMAIN}/logout` +
  `?client_id=${CLIENT_ID}` +
  `&logout_uri=${encodeURIComponent(REDIRECT_SIGN_OUT)}`;