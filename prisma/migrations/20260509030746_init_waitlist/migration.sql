-- CreateEnum
CREATE TYPE "City" AS ENUM ('MUMBAI', 'NAGPUR', 'PUNE', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CONSUMER', 'VENDOR', 'BRAND');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('IN', 'US');

-- CreateTable
CREATE TABLE "Waitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" "City" NOT NULL,
    "role" "Role" NOT NULL,
    "phone" TEXT,
    "instagramHandle" TEXT,
    "sourceHandle" TEXT,
    "region" "Region" NOT NULL DEFAULT 'IN',
    "signedUpAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailSentAt" TIMESTAMP(3),
    "ipHash" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_email_key" ON "Waitlist"("email");

-- CreateIndex
CREATE INDEX "Waitlist_email_idx" ON "Waitlist"("email");

-- CreateIndex
CREATE INDEX "Waitlist_city_idx" ON "Waitlist"("city");

-- CreateIndex
CREATE INDEX "Waitlist_role_idx" ON "Waitlist"("role");

-- CreateIndex
CREATE INDEX "Waitlist_signedUpAt_idx" ON "Waitlist"("signedUpAt");
