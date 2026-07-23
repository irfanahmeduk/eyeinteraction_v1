import { NextResponse } from "next/server";
import { appendToGoogleSheet } from "@/lib/googleSheets";
import { sendEmail } from "@/lib/mail";
import { eligibilityAdminTemplate } from "@/lib/mail/templates/eligibility-admin";
import { eligibilityUserTemplate } from "@/lib/mail/templates/eligibility-user";
import path from 'path';


export async function POST(req) {
  try {
    const body = await req.json();

    const formattedSubmittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });

    const formDataWithTime = {
      ...body,
      "Submitted At": formattedSubmittedAt,
    };

    // 1. Save submission row to Google Sheets
    let sheetSaved = false;
    try {
      await appendToGoogleSheet(formDataWithTime, "Form Responses 1");
      sheetSaved = true;
    } catch (sheetError) {
      console.error("Google Sheets append error:", sheetError);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong! Please try again later.",
        }
      );
    }

    const userName = body["Contact"] || body["name"] || "Applicant";
    const userEmail = body["Email Address"] || body["email"];
    
    // 2. Email notification to Admin using template
    if (process.env.CONTACT_EMAIL) {
      try {
        await sendEmail({
          to: process.env.CONTACT_EMAIL,
          ...eligibilityAdminTemplate(formDataWithTime),
        });
      } catch (adminMailErr) {
        console.error("Admin notification email error:", adminMailErr);
      }
    }

    // 3. Auto-reply confirmation email to User using template
    if (userEmail) {
      try {
        await sendEmail({
          to: userEmail,
          ...eligibilityUserTemplate({ name: userName }),
          attachments: [
            {
              filename: "signature.png",
              path: path.join(process.cwd(), "public", "mail", "signature.png"),
              cid: "signatureImage",
            },
          ],
        });
      } catch (userMailErr) {
        console.error("User confirmation email error:", userMailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Form response submitted successfully!",
      sheetSaved,
    });
  } catch (error) {
    console.error("Eligibility submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process submission.",
      },
      { status: 500 }
    );
  }
}
