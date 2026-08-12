import { CognitoJwtVerifier } from "aws-jwt-verify";
import { SimpleJwksCache } from "aws-jwt-verify/jwk";
import { SimpleFetcher } from "aws-jwt-verify/https";

const verifier = CognitoJwtVerifier.create(
  {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.COGNITO_CLIENT_ID,
  },
  {
    jwksCache: new SimpleJwksCache({
      fetcher: new SimpleFetcher({
        defaultRequestOptions: {
          responseTimeout: 10000,
        },
      }),
    }),
  }
);

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifier.verify(token);

    req.user = payload;

    next();
  }catch (err) {
  console.error("JWT Verify Error:", err);

  return res.status(401).json({
    success: false,
    message: err.message,
  });
}
}