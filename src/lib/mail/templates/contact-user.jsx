import path from "path";

export function contactUserTemplate({ name }) {
    return {
      subject: "We've received your enquiry — Eye Interaction Ltd",
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've received your enquiry</title>
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
                      <img src="https://eyeinteraction.com/logo.png" alt="Eye Interaction Ltd" height="36" style="display:block; border:0; height:36px; width:auto;" />
                    </td>
                    <td valign="middle" style="padding-left:16px;">
                      <p style="margin:0; color:#173a66; font-size:19px; font-weight:700; font-family: Georgia, 'Times New Roman', serif;">Eye Interaction Ltd</p>
                      <p style="margin:2px 0 0 0; color:#64748b; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; font-family: Arial, sans-serif;">Enquiry Confirmation</p>
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
                <p style="margin:0; color:#64748b; font-size:11px; letter-spacing:2px; text-transform:uppercase; font-family: Arial, sans-serif;">Message Received</p>
                <h1 style="margin:6px 0 0 0; color:#1e293b; font-size:22px; font-weight:700; font-family: Georgia, 'Times New Roman', serif;">
                  Thank You for Contacting Us
                </h1>
              </td>
            </tr>
  
            <!-- Body -->
            <tr>
              <td style="padding:20px 40px 8px 40px; font-family: Arial, sans-serif;">
                <p style="margin:0 0 16px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                  Dear <strong>${name}</strong>,
                </p>
                <p style="margin:0 0 16px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                  Thank you for reaching out to Eye Interaction Ltd. This email confirms that we have successfully received your enquiry.
                </p>
                <p style="margin:0 0 24px 0; color:#1e293b; font-size:14px; line-height:1.8;">
                  A member of our team will review your message and respond within <strong>24 business hours</strong>. If your enquiry requires urgent attention, please reply directly to <a href="mailto:noor@eyeinteraction.com">noor@eyeinteraction.com</a>
                </p>
              </td>
            </tr>
  
            <!-- Details table (receipt style) -->
            <tr>
              <td style="padding:0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase; width:140px;">Recipient</td>
                    <td style="padding:12px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px; font-weight:600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Status</td>
                    <td style="padding:12px 0; border-bottom:1px solid #e2e7ee; color:#173a66; font-size:14px; font-weight:600;">Enquiry Received</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Expected Response</td>
                    <td style="padding:12px 0; color:#1e293b; font-size:14px; font-weight:600;">Within 24 Business Hours</td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <!-- Signature -->
            <tr>
              <td style="padding:32px 40px 8px 40px; font-family: Arial, sans-serif;">
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
                  This is an automated message from Eye Interaction Ltd. Please do not reply if you did not submit this enquiry.<br />
                  © ${new Date().getFullYear()} Eye Interaction Ltd. All rights reserved.
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
      attachments: [
        {
          filename: "signature.png",
          path: path.join(process.cwd(), "public", "images", "mail", "signature.png"),
          cid: "signatureImage",
        },
      ],
    };
  }