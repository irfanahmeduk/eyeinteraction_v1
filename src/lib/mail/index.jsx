import { transporter } from "./transporter";

export async function sendEmail({ to, subject, html, from }) {
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}