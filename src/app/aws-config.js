const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_Nd1mqHo9q",
      userPoolClientId: "3l8efe5ajhfo1eh2it4diicjf6",
      loginWith: {
        oauth: {
          domain: "us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com",
          scopes: ["email", "openid", "profile"],
          redirectSignIn: ["https://iris-iot-react.netlify.app/"],
          redirectSignOut: ["https://iris-iot-react.netlify.app/"],
          responseType: "code",
        },
      },
    },
  },
};

export default awsConfig;