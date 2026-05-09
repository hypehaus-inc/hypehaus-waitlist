import { Resend } from "resend";

const globalForResend = globalThis as unknown as {
  resend: Resend | undefined;
};

export const resend =
  globalForResend.resend ??
  new Resend(process.env.RESEND_API_KEY);

if (process.env.NODE_ENV !== "production") globalForResend.resend = resend;

const FROM = process.env.RESEND_FROM_EMAIL || "hello@hypehaus.org";

const CITY_LABELS: Record<string, string> = {
  MUMBAI: "Mumbai",
  NAGPUR: "Nagpur",
  PUNE: "Pune",
  OTHER: "your city",
};

function emailHtml(cityLabel: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>You're on the list.</title>
</head>
<body style="margin:0;padding:0;background:#020202;font-family:Helvetica,Arial,sans-serif;color:#F4F4F4;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#020202;">
  <tr>
    <td align="center" style="padding:64px 24px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:520px;">

        <tr>
          <td style="padding-bottom:48px;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3.2px;text-transform:uppercase;color:rgba(255,255,255,0.32);font-weight:600;">
            HYPEHAUS &middot; CONFIRMED
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:64px;font-weight:900;letter-spacing:-2.88px;line-height:0.86;color:#F4F4F4;text-transform:uppercase;">
            TONIGHT
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:48px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:40px;font-weight:500;letter-spacing:-1px;line-height:0.9;color:#F4F4F4;">
            is yours<span style="color:rgba(255,255,255,0.55);">.</span>
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:32px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:rgba(255,255,255,0.70);">
            You&rsquo;re on the list. We&rsquo;ll let you know when HypeHaus drops in <strong style="color:#F4F4F4;font-weight:500;">${cityLabel}</strong>.
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:48px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:rgba(255,255,255,0.70);">
            Premium nightlife, lifestyle, and the social layer that only unlocks when you scan in at the door.<br><br>
            The night belongs to you.
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:24px;border-top:1px solid rgba(255,255,255,0.18);padding-top:32px;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3.2px;text-transform:uppercase;color:rgba(255,255,255,0.32);font-weight:600;">
            MUMBAI &middot; NAGPUR &middot; PUNE
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:8px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#F4F4F4;letter-spacing:0.5px;">
            HYPEHAUS
          </td>
        </tr>

        <tr>
          <td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.40);">
            <a href="https://hypehaus.org" style="color:rgba(255,255,255,0.40);text-decoration:none;">hypehaus.org</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function emailText(cityLabel: string): string {
  return [
    "you're on the list.",
    "",
    `we'll let you know when hypehaus drops in ${cityLabel}.`,
    "",
    "premium nightlife, lifestyle, and the social layer that only unlocks when you scan in at the door.",
    "",
    "the night belongs to you.",
    "",
    "—",
    "hypehaus",
    "mumbai · nagpur · pune",
    "hypehaus.org",
  ].join("\n");
}

export async function sendWelcomeEmail(to: string, city: string) {
  const cityLabel = CITY_LABELS[city] ?? "your city";

  return resend.emails.send({
    from: `HypeHaus <${FROM}>`,
    to,
    subject: "you're on the list.",
    html: emailHtml(cityLabel),
    text: emailText(cityLabel),
  });
}
