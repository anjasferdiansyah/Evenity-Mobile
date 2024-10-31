import { z } from 'zod';

const userSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .max(50, 'Email must be less than 50 characters')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password must be at least 1 characters')
        .max(50, 'Password must be less than 50 characters')
        // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .regex(/[0-9]/, 'Password must contain at least one number')
        // .regex(/[@$!%*?&]/, 'Password must contain at least one special character')
        // .refine((password) => !password.includes(' '), {
        //     message: 'Password cannot contain spaces',
        // }),
});

// Example usage with async validation
function validateUser(data) {
    try {
        const validated = userSchema.parse(data);
        return {
            success: true,
            data: validated,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // console.log(error.errors)
            return {
                success: false,
                error: error.errors[0].message,
            };
        }
        throw error;
    }
}

export {validateUser};