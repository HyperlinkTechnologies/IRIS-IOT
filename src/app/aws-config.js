const COGNITO_DOMAIN =
  "https://us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com";

const CLIENT_ID =
  "3l8efe5ajhfo1eh2it4diicjf6";

const REDIRECT_URI =
  "https://www.hyperlinktech.in/iris-iot-gateway";

const SCOPES =
  "openid+email+profile";

export const loginUrl =
  `${COGNITO_DOMAIN}/login` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&scope=${SCOPES}` +
  `&redirect_uri=${REDIRECT_URI}`;

export const signupUrl =
  `${COGNITO_DOMAIN}/signup` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&scope=${SCOPES}` +
  `&redirect_uri=${REDIRECT_URI}`;