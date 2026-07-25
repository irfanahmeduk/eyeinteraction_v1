// emails/welcomeUserTemplate.js
export function eligibilityUserTemplate({ name }) {
  return {
    subject: "Welcome to Eye Interaction | Global Talent Visa Journey",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f5f8; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f5f8; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border:1px solid #e2e7ee;">

          <!-- Top accent bar -->
          <tr>
            <td style="background-color:#173a66; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
          </tr>

          <!-- Header / Logo -->
          <tr>
            <td style="padding:32px 40px 24px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td valign="middle" style="width:64px;">
                    <img src="https://eyeinteraction.com/assets/logo-CMgOn3p4.png" alt="Eye Interaction" width="56" style="display:block; border:0;" />
                  </td>
                  <td valign="middle" style="padding-left:16px;">
                    <p style="margin:0; color:#173a66; font-size:19px; font-weight:700; font-family: Georgia, 'Times New Roman', serif;">Eye Interaction</p>
                    <p style="margin:2px 0 0 0; color:#64748b; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; font-family: Arial, sans-serif;">Global Talent Visa Journey</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none; border-top:1px solid #1e293b; margin:0;" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 40px 4px 40px;">
              <p style="margin:0; color:#64748b; font-size:11px; letter-spacing:2px; text-transform:uppercase; font-family: Arial, sans-serif;">Welcome</p>
              <h1 style="margin:6px 0 0 0; color:#1e293b; font-size:22px; font-weight:700; font-family: Georgia, 'Times New Roman', serif;">
                Hi ${name},
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px 40px 8px 40px; font-family: Arial, sans-serif;">
              <p style="margin:0 0 16px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                Thank you for showing interest in the Global Talent Visa program through <strong>Eye Interaction</strong>. We're excited to learn more about your background and explore how we can support your journey to the UK.
              </p>
              <p style="margin:0 0 16px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                We would like to invite you for a <strong>free one-on-one consultation</strong> with one of our experienced consultants. During this session, we will:
              </p>
              <ul style="margin:0 0 16px 0; padding-left:20px; color:#1e293b; font-size:14px; line-height:1.8;">
                <li>Review your profile in detail</li>
                <li>Assess your eligibility for the Global Talent Visa</li>
                <li>Guide you on the next steps in the process</li>
              </ul>
              <p style="margin:0 0 16px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                This session is designed to give you clarity, answer your questions, and help you make an informed decision.
              </p>
              <p style="margin:0 0 8px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                <strong>Our availability is as follows:</strong><br/>
                Monday to Friday: 01:00 PM till 03:00 PM (UK Time)<br/>
                Saturday and Sunday: 10:00 AM till 03:00 PM (UK Time)
              </p>
              <p style="margin:0 0 24px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                Kindly ensure the selected time aligns with your availability and time zone to avoid any scheduling conflicts. You will receive an automatic confirmation and the meeting link upon booking.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 40px 24px 40px; text-align:center; font-family: Arial, sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#173a66; border-radius:4px;">
                    <a href="https://calendly.com/noor-eyeinteraction/uk-global-talent-visa-consultation-1-1-zoom-meeting"
                       target="_blank"
                       style="display:inline-block; padding:14px 28px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; letter-spacing:0.3px;">
                      BOOK FREE CONSULTATION NOW
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:16px 40px 8px 40px; font-family: Arial, sans-serif;">
              <p style="margin:0 0 12px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                We look forward to speaking with you and helping you move closer to your goals.
              </p>
              <p style="margin:0; color:#1e293b; font-size:14px; line-height:1.8;">
                Warm regards,<br />
                <img src="cid:signatureImage" alt="Signature" style="margin-top:8px; max-width:220px; display:block;" />
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 32px 40px;">
              <hr style="border:none; border-top:1px solid #e2e7ee; margin:0 0 16px 0;" />
              <p style="margin:0; color:#94a3b8; font-size:11px; line-height:1.7; font-family: Arial, sans-serif;">
                This is an automated email from Eye Interaction.<br />
                © ${new Date().getFullYear()} Eye Interaction. All rights reserved.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#173a66; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}