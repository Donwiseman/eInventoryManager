'use server'

import { SignupSchema } from '@/schemas'
import * as z from 'zod'

const defaultResponse = {
    error:'',
    success: ''
}

export async function signupAction(values: z.infer<typeof SignupSchema>) {
    const validatedFields = SignupSchema.safeParse(values)
    if (!validatedFields.success) return {...defaultResponse, error: 'Enter valid inputs'}
    console.log(validatedFields.data)
}