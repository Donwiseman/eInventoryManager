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
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import Cookies from 'js-cookie'


export default function LoginForm () {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already in use with different provider'
    : ''

    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [showtwoFactor, setShowTwoFactor] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setErrorMessage('')
        setSuccessMessage('')

        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        startTransition(async () => {
            await axios.post('https://test-goinventorymanager.koyeb.app/api/v1/login', formData)
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage(res.data.message)
                    Cookies.set('jwt', res.data.jwt)
                    router.push('/user')
                } else {
                    setErrorMessage(res.data.message)
                }
            })
            .catch((error: any) => {
                setErrorMessage('Something went wrong. Please try again later!')
                console.error(error)
            })
        })
    }

    return (
        <CardWrapper
            title='Login'
            description='Enter credentials below and click the login button.'
            backButtonHref='/signup'
            backButtonLabel='Dont have an account? Sign up'
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
                                            <Button
                                            variant='link'
                                            size='lg'
                                            className='px-auto w-full'
                                            >
                                                <Link href='/forgot-password'>Forgot Password</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={errorMessage || urlError}/>
                    <FormSuccess message={successMessage}/>
                    <Button
                        disabled={isPending}
                        type='submit'
                        className='w-full bg-slate-900 text-white'
                    >{showtwoFactor ? 'Confirm' : 'Login' }</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}