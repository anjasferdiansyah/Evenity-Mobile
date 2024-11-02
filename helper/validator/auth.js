import {z} from 'zod';

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

export const registerSchema = z.object({
    userEmail: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),

    userPassword: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),

    userPasswordConfirmation: z
        .string()
        .min(1, "Password confirmation is required"),

    provinceSearchText: z
        .string()
        .min(1, "Province name is required"),

    citySearchText: z
        .string()
        .min(1, "City name is required"),

    districtSearchText: z
        .string()
        .min(1, "District selection is required"),
}).refine((data) => data.userPassword === data.userPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["userPasswordConfirmation"],
});

// Custom validation function
const validateRegistration = (formData) => {
    try {
        const validatedData = registerSchema.parse(formData);
        return {
            success: true,
            data: validatedData,
            error: null
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Format Zod errors into a more readable format
            const errors = error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message
            }));

            return {
                success: false,
                data: null,
                error: errors
            };
        }

        return {
            success: false,
            data: null,
            error: [{message: "An unexpected error occurred"}]
        };
    }
};

export {validateUser, validateRegistration};