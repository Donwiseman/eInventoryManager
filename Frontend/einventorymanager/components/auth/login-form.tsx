'use client'

import CardWrapper from '@/components/auth/card-warpper'
import {
    Form,
    FormItem,
    FormControl,
    FormField,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import FormError from '@/components/others/form-error'
import FormSuccess from '@/components/others/form-success'
import { loginAction } from '@/actions/login'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signup } from '@/components/urls';


export default function LoginForm () {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already in use with different provider'
    : ''

    const [isPending, startTransition] = useTransition()
    const [resErrorMessage, setResErrorMessage] = useState('')
    const [resSuccessMessage, setResSuccessMessage] = useState('')
    const [showtwoFactor, setShowTwoFactor] = useState(false)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setResErrorMessage('')
        setResSuccessMessage('')
        startTransition(async () => {
            loginAction(values)
            .then((data) => {
                if (data?.error) {
                    form.reset()
                    setResErrorMessage(data.error)
                }
                if (data?.success) {
                    form.reset()
                    setResSuccessMessage(data.success)
                }

                if (data?.twoFactor) {
                    setShowTwoFactor(true)
                }
            })
            .catch (() => setResErrorMessage('There was an error signing you up. Try again in a few minutes'))
                
        })
    }

    return (
        <CardWrapper
            title='Login'
            description='Enter credentials below and click the login button.'
            backButtonHref={signup}
            backButtonLabel='Dont have an account? Sign up'
            styles='text-green-700 mb-10'
        >
            <Form {...form}>
                <form
                    className='space-y-6'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='space-y-4'>
                        {showtwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name='code'
                                    render={({ field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='123456'
                                                type='text'
                                                />
                                            </FormControl>
                                            <FormMessage className='text-red-600'/>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {!showtwoFactor && (
                            <>
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
                            </>
                        )}
                    </div>
                    <FormError message={resErrorMessage || urlError}/>
                    <FormSuccess message={resSuccessMessage}/>
                    <Button
                        disabled={isPending}
                        type='submit'
                        className='w-full bg-slate-900 text-white'
                    >{showtwoFactor ? 'Confirm' : 'Login' }</Button>
                    <Button
                                            variant='link'
                                            size='lg'
                                            className='px-auto w-full'
                                            >
                                                <Link href='/auth/reset'>Forgot Password</Link>
                                            </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}