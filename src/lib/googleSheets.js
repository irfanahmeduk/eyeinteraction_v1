import { google } from "googleapis";

export async function appendToGoogleSheet(data, sheetName = "Form Responses 1") {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !rawPrivateKey || !spreadsheetId) {
    throw new Error("Google Sheets environment variables are missing.");
  }

  // Handle line breaks in RSA private key string
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  
  // Map object entries into row array in correct column order
  const values = [
    [
      "",
      "",
      data["Submitted At"] || "",
      data["Contact"] || "",
      data["priorities"] || "",
      data["comments"] || "",
      (data["Phone Number (with country code)"] || "").replace("+", ""),
      data["Email Address"] || "",
      data["Country"] || "",
      data["Nationality"] || "",
      data["Linkedin_profile"] || "",
      data["Status"] || "",
      Array.isArray(data["Why are you considering a Global Talent Visa? (Select all that apply)"])
        ? data["Why are you considering a Global Talent Visa? (Select all that apply)"].join(", ")
        : data["Why are you considering a Global Talent Visa? (Select all that apply)"] || "",
      data["Have you applied for any visa to this country before?"] || "",
      data["If yes, please describe the visa type and outcome."] || "",
      data["Current Job Title"] || "",
      data["Industry/Sector (e.g., Software, Design, Research, Media, etc.)"] || "",
      data["linkedin_profile"] || "",
      data["Years of Professional Experience"] || "",
      data["What is your highest academic qualification?"] || "",
      data["Have you received any awards, honors, or recognitions in your field?"] || "",
      data["If yes, Please describe your awards or recognitions (Short answer)"] || "",
      data["Have you been featured in any media, press, or published articles?"] || "",
      data["If yes,  Provide links or details of media features/publications"] || "",
      data["Have you made any public presentations, keynote speeches, or panel contributions?"] || "",
      data["If yes,  Briefly describe where and when you presented."] || "",
      data["Are you involved in any open-source projects, startups, or innovation-driven work?"] || "",
      data["If yes,  Describe your role and achievements in that work."] || "",
      data["Do you currently have any international clients or collaborations?"] || "",
      data["Describe the international work or clients you’ve been involved with."] || "",
      data["When are you planning to apply for the Global Talent Visa?"] || "",
      data["Have you already prepared any documents for a Global Talent Visa application?"] || "",
      data["If yes, Please list any documents you've already prepared (e.g., reference letters, CV, evidence)"] || "",
      data["Any questions or comments you'd like to share? (Optional)"] || "",
      data["Do you consent to us contacting you via WhatsApp or email for the next steps?"] || "",
    ],
  ];

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values,
    },
  });

  return response.data;
}
