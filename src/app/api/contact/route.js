import { NextResponse } from "next/server";

import { sendEmail } from "@/lib/mail";
import { contactAdminTemplate } from "@/lib/mail/templates/contact-admin";
import { contactUserTemplate } from "@/lib/mail/templates/contact-user";

export async function POST(req) {
  try {
    const body = await req.json();

    // Send notification to company
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      ...contactAdminTemplate(body),
    });

    // Auto reply to customer
    await sendEmail({
      to: body.email,
      ...contactUserTemplate(body),
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}