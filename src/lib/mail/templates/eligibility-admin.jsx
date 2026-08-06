export function eligibilityAdminTemplate(data) {
  const name = data["Contact"] || data["name"] || "Applicant";
  const email = data["Email Address"] || data["email"] || "";
  const phone = data["Phone Number (with country code)"] || "—";
  const country = data["Country"] || "—";
  const nationality = data["Nationality"] || "—";
  const jobTitle = data["Current Job Title"] || "—";
  const industry = data["Industry/Sector (e.g., Software, Design, Research, Media, etc.)"] || "—";
  const linkedin = data["linkedin_profile"] || "—";
  const experience = data["Years of Professional Experience"] || "—";
  const qualification = data["What is your highest academic qualification?"] || "—";
  const timeline = data["When are you planning to apply for Global Talent Endorsement?"] || "—";
  const reasons = Array.isArray(data["Why are you considering Global Talent Endorsement? (Select all that apply)"])
    ? data["Why are you considering Global Talent Endorsement? (Select all that apply)"].join(", ")
    : data["Why are you considering Global Talent Endorsement? (Select all that apply)"] || "—";

  return {
    subject: `New Global Talent Assessment — ${name}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Global Talent Assessment</title>
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
                    <p style="margin:2px 0 0 0; color:#64748b; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; font-family: Arial, sans-serif;">Global Talent Notification</p>
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
              <p style="margin:0; color:#64748b; font-size:11px; letter-spacing:2px; text-transform:uppercase; font-family: Arial, sans-serif;">Eligibility Assessment</p>
              <h1 style="margin:6px 0 0 0; color:#1e293b; font-size:22px; font-weight:700; font-family: Georgia, 'Times New Roman', serif;">
                New Assessment Received
              </h1>
            </td>
          </tr>

          <!-- Meta line -->
          <tr>
            <td style="padding:12px 40px 0 40px; font-family: Arial, sans-serif;">
              <p style="margin:0; color:#64748b; font-size:12px;">
                Submitted on <strong style="color:#1e293b;">${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
              </p>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="padding:24px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase; width:150px;">Applicant Name</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px; font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Email Address</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; font-size:14px;">
                    <a href="mailto:${email}" style="color:#173a66; text-decoration:none; font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Phone</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px; font-weight:600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Residence / Nationality</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px;">${country} (${nationality})</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Job Title / Industry</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px; font-weight:600;">${jobTitle} (${industry})</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Experience & Degree</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px;">${experience} • ${qualification}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">LinkedIn / Portfolio</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#173a66; font-size:14px; font-weight:600;">
                    <a href="${linkedin}" target="_blank" style="color:#173a66; text-decoration:none;">${linkedin}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Target Timeline</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e2e7ee; color:#1e293b; font-size:14px; font-weight:600;">${timeline}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#64748b; font-size:11px; letter-spacing:1px; text-transform:uppercase;">Reasons</td>
                  <td style="padding:10px 0; color:#1e293b; font-size:13px;">${reasons}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action -->
          <tr>
            <td style="padding:28px 40px 8px 40px; font-family: Arial, sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border:1px solid #173a66;">
                    <a href="mailto:${email}" style="display:inline-block; padding:11px 26px; color:#173a66; font-size:13px; font-weight:700; text-decoration:none; letter-spacing:0.3px;">
                      REPLY TO ${name.toUpperCase()}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 32px 40px;">
              <hr style="border:none; border-top:1px solid #e2e7ee; margin:0 0 16px 0;" />
              <p style="margin:0; color:#94a3b8; font-size:11px; line-height:1.7; font-family: Arial, sans-serif;">
                Full submission responses are logged automatically in your Google Sheet.<br />
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
  };
}
