const { Resend } = require('resend');
const { escapeHtml } = require('../utils/text');

class EmailService {
  constructor({ resendApiKey, contactToEmail, contactFromEmail }) {
    this.resendApiKey = resendApiKey;
    this.contactToEmail = contactToEmail;
    this.contactFromEmail = contactFromEmail;
    this.client = new Resend(resendApiKey);
  }

  isConfigured() {
    return Boolean(this.resendApiKey && this.contactToEmail);
  }

  async sendContactEmail({ name, email, message }) {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const submittedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const { error } = await this.client.emails.send({
      from: this.contactFromEmail,
      to: this.contactToEmail,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n'),
      html: `
        <div style="margin:0; padding:24px; background:#f4f5f7; font-family: 'Segoe UI', Arial, sans-serif; color:#101828;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e6e8ec; border-radius:14px; overflow:hidden;">
            <tr>
              <td style="padding:20px 24px; background:linear-gradient(90deg, #50207A, #838ce5); color:#ffffff;">
                <p style="margin:0; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; opacity:0.92;">Portfolio Contact</p>
                <h2 style="margin:8px 0 0; font-size:24px; line-height:1.3;">New Message Received</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 10px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:8px 0; width:120px; color:#667085; font-size:14px;">Name</td>
                    <td style="padding:8px 0; font-size:15px; font-weight:600; color:#111827;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:120px; color:#667085; font-size:14px;">Email</td>
                    <td style="padding:8px 0; font-size:15px;">
                      <a href="mailto:${safeEmail}" style="color:#3b5bdb; text-decoration:none; font-weight:600;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; width:120px; color:#667085; font-size:14px;">Submitted</td>
                    <td style="padding:8px 0; font-size:14px; color:#344054;">${submittedAt}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px;">
                <div style="border:1px solid #e6e8ec; border-radius:12px; background:#f8fafc; padding:16px;">
                  <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#667085;">Message</p>
                  <p style="margin:0; white-space:pre-wrap; line-height:1.7; font-size:15px; color:#111827;">${safeMessage}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      throw new Error('EMAIL_SEND_FAILED');
    }
  }
}

module.exports = { EmailService };
