'use client'

import ForgotPasswordForm from '@/components/auth/forgot-password-form'
import { useCookie } from '@/contexts/auth-context'
import React from 'react'


function ForgotPasswordPage() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-full md:w-[480px]'><ForgotPasswordForm /></div>
    </div>
  )
}

export default ForgotPasswordPage