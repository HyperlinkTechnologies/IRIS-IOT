import { Amplify } from "aws-amplify";

Amplify.configure({

  Auth: {

    Cognito: {

      userPoolId:
        "us-east-1_nd1mqho9q",

      userPoolClientId:
        "5d8uo8cktjc6ukhnps699nj68i",

      loginWith: {

        oauth: {

          domain:
            "us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com",

          scopes: [
            "openid",
            "email",
            "profile",
          ],

          redirectSignIn: [
            "http://localhost:5173/Dashboard",
            "https://iris-iot-react.netlify.app/Dashboard",
          ],

          redirectSignOut: [
            "http://localhost:5173",
            "https://iris-iot-react.netlify.app",
          ],

          responseType: "code",
        },
      },
    },
  },
});