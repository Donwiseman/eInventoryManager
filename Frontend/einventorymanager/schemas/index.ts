import * as z from 'zod'


export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Enter a valid email'
    }),
    password: z.string().min(8, {
        message: 'Password is required'
    }),
    code: z.optional(z.string())
})

export const ForgotPasswordFormSchema = z.object({
    email: z.string().email({
        message: 'Enter a valid email!'
    }),
})

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(8, {
        message: 'Password should be minimum 8 characters!'
    }),
    resetCode: z.string().length(6, {
        message: 'Reset code should be  digits!'
    })
})

export const SignupSchema = z.object({
    email: z.string().email({
        message: 'Enter a valid email'
    }),
    password: z.string().min(8, {
        message: 'Minimum 8 characters is required'
    }),
    firstName: z.string().min(1, {
        message: 'Name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Name is required'
    })
})


export const ItemsTableSchema = z.object({
    id: z.string(),
    name: z.string().min(8, {
        message: 'Minimum 8 characters is required'
    }),
    description: z.string().min(1, {
        message: 'Item description is required'
    }),
    price: z.number().min(0, {
        message: 'Price must be bigger than 0'
    }),
    quantity: z.number()
})


export const CreateOrgaizationFormSchema = z.object({
    id: z.optional(z.string()),
    ownerId: z.optional(z.string()),
    name: z.string().min(8, {
        message: 'Minimum 8 characters is required'
    }),
    description: z.string().min(1, {
        message: 'Description is required'
    }),
    country: z.string(),
    timezone: z.string(),
    mobile: (z.string().min(9).max(10)),
    address: z.string().min(1, {
        message: 'Address is required'
    }),
})
