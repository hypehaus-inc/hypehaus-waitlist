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

export async function sendWelcomeEmail(to: string, city: string) {
  const cityLabel = CITY_LABELS[city] ?? "your city";

  return resend.emails.send({
    from: `HypeHaus <${FROM}>`,
    to,
    subject: "you're on the list.",
    text: [
      "you're on the list.",
      "",
      `we'll let you know when hypehaus drops in ${cityLabel}.`,
      "",
      "the night belongs to you.",
      "",
      "—",
      "hypehaus",
      "hypehaus.org",
    ].join("\n"),
  });
}
