import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().min(1, "auth.register.errors.emailRequired").email("auth.register.errors.email"),
  password: z.string().min(6, "auth.register.errors.password"),
});

const baseRegisterSchema = z.object({
  fullName: z.string().min(3, "auth.register.errors.fullName"),
  email: z.string().min(1, "auth.register.errors.emailRequired").email("auth.register.errors.email"),
  password: z.string().min(6, "auth.register.errors.password"),
  phone: z.string().regex(/^(\+98|0)?9\d{9}$/, "auth.register.errors.phone").optional().or(z.literal("")),
});

export const patientRegisterSchema = baseRegisterSchema.extend({
  nationalId: z.string().regex(/^\d{10}$/, "auth.register.errors.nationalId"),
});

export const doctorRegisterSchema = baseRegisterSchema.extend({
  licenseNumber: z.string().min(3, "auth.register.errors.licenseNumber"),
  specialty: z.string().min(2, "auth.register.errors.specialty"),
});

export type LoginFields = z.infer<typeof loginSchema>;
export type PatientFields = z.infer<typeof patientRegisterSchema>;
export type DoctorFields = z.infer<typeof doctorRegisterSchema>;
