import { SendEmailCommand } from "@aws-sdk/client-ses";
import { ses } from "../config/ses.js";

async function testSES() {
  try {
    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,

      Destination: {
        ToAddresses: [
          process.env.SES_FROM_EMAIL,
        ],
      },

      Message: {
        Subject: {
          Data: "IRIS SES Test",
        },

        Body: {
          Html: {
            Data: `
              <h1>Amazon SES Working ✅</h1>

              <p>This email was sent from IRIS Backend.</p>
            `,
          },
        },
      },
    });

    await ses.send(command);

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error(err);
  }
}

testSES();