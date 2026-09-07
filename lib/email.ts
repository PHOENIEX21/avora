import crypto from "node:crypto";
import { sql } from "@/lib/db";

export async function createVerificationToken(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  await sql`DELETE FROM email_verification_tokens WHERE user_id=${userId}`;
  await sql`INSERT INTO email_verification_tokens(user_id,token_hash,expires_at) VALUES(${userId},${tokenHash},now()+interval '30 minutes')`;
  return token;
}

export function hashVerificationToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function sendVerificationEmail(to: string, fullName: string, token: string) {
  const baseUrl = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const fromName = process.env.SENDGRID_FROM_NAME || "AVORA";

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`AVORA verification link for ${to}: ${verifyUrl}`);
      return { sent: false, devVerificationUrl: verifyUrl };
    }
    return { sent: false };
  }

  const firstName = fullName.trim().split(/\s+/)[0] || "Learner";
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: fromName },
      subject: "Verify your AVORA account",
      content: [{
        type: "text/html",
        value: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#122033"><div style="font-weight:800;letter-spacing:.15em;color:#0b1f3a">AVORA</div><h1 style="color:#0b1f3a">Welcome, ${firstName}.</h1><p style="line-height:1.7;color:#667085">One quick step and your learning journey is ready. Verify your email to secure your account and continue into AVORA.</p><p style="margin:28px 0"><a href="${verifyUrl}" style="display:inline-block;background:#0b1f3a;color:white;text-decoration:none;padding:14px 22px;border-radius:12px;font-weight:700">Verify my email</a></p><p style="font-size:13px;color:#98a2b3">This link expires in 30 minutes. If you did not create an AVORA account, you can ignore this email.</p></div>`
      }]
    })
  });
  if (!response.ok) throw new Error(`SendGrid returned ${response.status}`);
  return { sent: true };
}
