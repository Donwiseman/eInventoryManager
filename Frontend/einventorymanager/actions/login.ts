'use server'

import { LoginSchema } from '@/schemas'
import * as z from 'zod'

const defaultResponse = {
    error:'',
    success: '',
    twoFactor: ''

}

export async function loginAction(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) return { ...defaultResponse, error: 'Enter valid inputs'}
    console.log(validatedFields.data)
}