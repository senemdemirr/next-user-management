import * as z from 'zod';

export const SignupSchema = z.object({
    name: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.email({ error: 'Please enter a valid email.' }),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long.' })
        .regex(/[a-zA-Z]/, { error: 'Password must contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { error: 'Password must contain at least one special character.' })
        .trim(),
});
export const LoginSchema = z.object({
    email: z.email({ error: "Please enter a valid email" }),
    password: z.string().min(3, { error: "Password is required" })
});

export const PasswordUpdateSchema = z.object({
    email: z.email({ error: "Please enter a valid email" }),
    newPassword: z
        .string()
        .min(8, { error: "Password must be at least 8 characters length" })
        .regex(/[a-zA-Z]/, { error: 'Password must contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { error: 'Password must contain at least one special character.' })
        .trim()
});
export const DeleteAccountSchema = z.object({
    password: z.string().min(3, {error: "Password is required"})
})