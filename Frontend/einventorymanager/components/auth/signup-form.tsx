'use client'


import {
    Form,
    FormItem,
    FormControl,
    FormField,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { SignupSchema } from '@/schemas'
import { Button } from '../ui/button'
import { useState, useTransition } from 'react'
import { signupAction } from '@/actions/signup'
import FormError from '@/components/others/form-error'
import FormSuccess from '@/components/others/form-success'
import CardWrapper from './card-warpper'
import { login } from '@/components/urls'


export default function SignupForm () {
    const [isPending, startTransition] = useTransition()
    const [resErrorMessage, setResErrorMessage] = useState('')
    const [resSuccessMessage, setResSuccessMessage] = useState('')

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {
        setResErrorMessage('')
        setResSuccessMessage('')
        startTransition(async () => {
            const res = await signupAction(values)
            if (res?.success) setResSuccessMessage(res.success)
            else if (res?.error) setResErrorMessage(res.error)
            else setResErrorMessage('There was an error signing you up. Try again in a few minutes')
        })
    }

    return (
        <CardWrapper
            title='Sign up'
            description='Enter credentials below and click the sign up button.'
            backButtonHref= {login}
            backButtonLabel='Already have an account? Login'
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                         {...field}
                                         disabled={isPending}
                                         placeholder='johndoe@example.com'
                                         type='email'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-600'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                         {...field}
                                         disabled={isPending}
                                         placeholder='******'
                                         type='password'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-600'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                         {...field}
                                         disabled={isPending}
                                         placeholder='john doe'
                                         type='text'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-600'/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={resErrorMessage}/>
                    <FormSuccess message={resSuccessMessage}/>
                    <Button
                        disabled={isPending}
                        className='w-full bg-slate-900 text-white'
                        type='submit'
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}