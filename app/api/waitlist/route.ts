import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/resend";
import { WaitlistSchema } from "@/lib/validation";

export const runtime = "nodejs";

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "hypehaus-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { email, city, role, phone, instagramHandle, sourceHandle } = parsed.data;

  const ip = getClientIp(req);
  const ipHash = hashIp(ip);
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  try {
    const existing = await prisma.waitlist.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You're already on the list. See you on the night." },
        { status: 409 }
      );
    }

    const entry = await prisma.waitlist.create({
      data: {
        email: email.toLowerCase(),
        city,
        role,
        phone: phone ?? null,
        instagramHandle: instagramHandle ?? null,
        sourceHandle: sourceHandle ?? null,
        ipHash,
        userAgent,
      },
    });

    sendWelcomeEmail(entry.email, city)
      .then(async () => {
        await prisma.waitlist.update({
          where: { id: entry.id },
          data: { emailSentAt: new Date() },
        });
      })
      .catch((err) => {
        console.error("[waitlist] welcome email failed:", err);
      });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[waitlist] insert failed:", err);
    return NextResponse.json(
      { error: "Something broke on our end. Try again in a minute." },
      { status: 500 }
    );
  }
}
