const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,

      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,

      allowGuestAccess: true,

      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COGNITO_DOMAIN,

          scopes: [
            "openid",
            "email",
            "profile",
            "aws.cognito.signin.user.admin",
          ],

          redirectSignIn: [
            import.meta.env.VITE_REDIRECT_SIGN_IN_LOCAL,
            import.meta.env.VITE_REDIRECT_SIGN_IN_PROD,
          ],

          redirectSignOut: [
            import.meta.env.VITE_REDIRECT_SIGN_OUT_LOCAL,
            import.meta.env.VITE_REDIRECT_SIGN_OUT_PROD,
          ],

          responseType: "code",
        },
      },
    },
  },
};

export default amplifyConfig;