import { z } from "zod";

export const CitySchema = z.enum(["MUMBAI", "NAGPUR", "PUNE", "OTHER"]);
export const RoleSchema = z.enum(["CONSUMER", "VENDOR", "BRAND"]);

const optionalString = (min: number, max: number, tooShort: string) =>
  z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine(
      (v) => v === undefined || (v.length >= min && v.length <= max),
      { message: tooShort }
    );

export const WaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("That doesn't look like a valid email"),
  city: CitySchema,
  role: RoleSchema,
  phone: optionalString(7, 20, "Phone looks too short"),
  instagramHandle: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v.replace(/^@/, "")))
    .optional()
    .refine(
      (v) => v === undefined || (v.length >= 1 && v.length <= 40),
      { message: "Instagram handle looks invalid" }
    ),
  sourceHandle: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof WaitlistSchema>;

export const CITY_OPTIONS = [
  { value: "MUMBAI", label: "Mumbai" },
  { value: "NAGPUR", label: "Nagpur" },
  { value: "PUNE", label: "Pune" },
  { value: "OTHER", label: "Other city" },
] as const;

export const ROLE_OPTIONS = [
  { value: "CONSUMER", label: "I want to attend nights" },
  { value: "VENDOR", label: "I run events / a venue" },
  { value: "BRAND", label: "I run a brand" },
] as const;
