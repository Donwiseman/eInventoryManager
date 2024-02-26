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
import { ForgotPasswordFormSchema, ResetPasswordSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import FormError from '@/components/others/form-error'
import FormSuccess from '@/components/others/form-success'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'


export default function ForgotPasswordForm () {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already in use with different provider'
    : ''

    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [showResetCodeCondatiner, setShowResetCodeCondatiner] = useState(false)

    const forgortPasswordform = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        defaultValues: {
            email: ''
        }
    })

    const ResetPasswordform = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            resetCode: ''
        }
    })

    const onSubmitForgotPassword = (values: z.infer<typeof ForgotPasswordFormSchema>) => {
        setErrorMessage('')
        setSuccessMessage('')
        setShowResetCodeCondatiner(false)

        const formData = new FormData();
        formData.append('email', values.email);

        startTransition(async () => {
            await axios.post('https://test-goinventorymanager.koyeb.app/api/v1/token', formData)
            .then((res) => {
                if (res.status === 200) setShowResetCodeCondatiner(true)
            })
            .catch (() => setErrorMessage('Something went wrong. Please try again later.'))
        })
    }

    const onSubmitResetPassword = (values: z.infer<typeof ResetPasswordSchema>) => {
        setErrorMessage('')
        setSuccessMessage('')
        setShowResetCodeCondatiner(false)

        const email = forgortPasswordform.getValues().email
        const formData = new FormData();
        formData.append('email', email);
        formData.append('code', values.resetCode);
        formData.append('password', values.newPassword);

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };

        startTransition(async () => {
            await axios.post('https://test-goinventorymanager.koyeb.app/api/v1/reset', formData, config)
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage('Password reset successful. Go back to the login page and login with your new password!')
                }
            })
            .catch ((error) => {
                console.error(error.response.data)
                setErrorMessage('Something went wrong. Please try again later.')
            })
        })
    }

    return (
        <CardWrapper
            title={showResetCodeCondatiner
                ? 'Reset Password'
                : 'Forgot Password?'}
            description={showResetCodeCondatiner
                ? 'Enter reset code and new password below to continue'
                : 'Enter email below to continue'}
            backButtonHref='/login'
            backButtonLabel='Go back to login'
        >
            {!showResetCodeCondatiner && (
                <Form {...forgortPasswordform}>
                    <form
                        className='space-y-6'
                        onSubmit={forgortPasswordform.handleSubmit(onSubmitForgotPassword)}
                    >
                        <div className='space-y-4'>
                            {!showResetCodeCondatiner && (
                                <>
                                    <FormField
                                        control={forgortPasswordform.control}
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
                            className='w-full'
                        >Continue</Button>
                    </form>
                </Form>
            )}
            {showResetCodeCondatiner && (
                <Form {...ResetPasswordform}>
                    <form
                        className='space-y-6'
                        onSubmit={ResetPasswordform.handleSubmit(onSubmitResetPassword)}
                    >
                        <div className='space-y-4'>
                                    <FormField
                                        control={ResetPasswordform.control}
                                        name='resetCode'
                                        render={({ field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder='172872'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={ResetPasswordform.control}
                                        name='newPassword'
                                        render={({ field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder='********'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                        </div>
                        <FormError message={errorMessage || urlError}/>
                        <FormSuccess message={successMessage}/>
                        <Button
                            disabled={isPending}
                            type='submit'
                            className='w-full'
                        >Continue</Button>
                    </form>
                    <p className='text-center pt-6'
                        onClick={() => setShowResetCodeCondatiner(false)}
                    >Back to forgot password</p>
                </Form>
            )}
        </CardWrapper>
    )
}