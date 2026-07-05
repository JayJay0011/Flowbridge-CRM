import { getResend } from "@/lib/email/resend";

type WaitlistEmailInput = {
  name: string;
  email: string;
  businessType: string;
  currentSystem: string;
  setupInterest: string;
};

export async function sendWaitlistConfirmation(input: WaitlistEmailInput) {
  const resend = getResend();
  const from = process.env.WAITLIST_CONFIRMATION_FROM;

  if (!resend || !from) {
    return { skipped: true };
  }

  const firstName = input.name.split(" ")[0] || "there";

  const { data, error } = await resend.emails.send({
    from,
    to: input.email,
    subject: "You are on the FlowBridge CRM early access list",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:32px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #dbe7f0; border-radius:12px; padding:28px;">
          <h1 style="color:#06111f; font-size:24px; margin:0 0 14px;">You are on the FlowBridge CRM early access list.</h1>
          <p style="color:#334155; font-size:16px; line-height:1.6; margin:0 0 16px;">Hi ${escapeHtml(firstName)}, thanks for requesting access.</p>
          <p style="color:#334155; font-size:16px; line-height:1.6; margin:0 0 16px;">We are building FlowBridge CRM as an occupation-adaptive CRM for lead-heavy service businesses. We will send product updates, private beta notes, and setup availability as the product moves forward.</p>
          <div style="background:#eef8fc; border:1px solid #cfeaf5; border-radius:10px; padding:16px; margin:20px 0;">
            <p style="color:#0f172a; font-size:14px; line-height:1.6; margin:0;"><strong>Business type:</strong> ${escapeHtml(input.businessType)}</p>
            <p style="color:#0f172a; font-size:14px; line-height:1.6; margin:8px 0 0;"><strong>Current system:</strong> ${escapeHtml(input.currentSystem)}</p>
            <p style="color:#0f172a; font-size:14px; line-height:1.6; margin:8px 0 0;"><strong>Setup interest:</strong> ${escapeHtml(input.setupInterest)}</p>
          </div>
          <p style="color:#64748b; font-size:14px; line-height:1.6; margin:0;">FlowBridge CRM</p>
        </div>
      </div>
    `,
  });

  if (error) {
    return { skipped: false, error };
  }

  return { skipped: false, id: data?.id };
}

export async function sendInternalWaitlistNotification(input: WaitlistEmailInput) {
  const resend = getResend();
  const from = process.env.WAITLIST_CONFIRMATION_FROM;
  const to = process.env.FLOWBRIDGE_INTERNAL_NOTIFY_EMAIL;

  if (!resend || !from || !to) {
    return { skipped: true };
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: `New FlowBridge CRM waitlist request: ${input.businessType}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding:24px;">
        <h1 style="font-size:20px;">New waitlist submission</h1>
        <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Business type:</strong> ${escapeHtml(input.businessType)}</p>
        <p><strong>Current system:</strong> ${escapeHtml(input.currentSystem)}</p>
        <p><strong>Setup interest:</strong> ${escapeHtml(input.setupInterest)}</p>
      </div>
    `,
  });

  if (error) {
    return { skipped: false, error };
  }

  return { skipped: false, id: data?.id };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
