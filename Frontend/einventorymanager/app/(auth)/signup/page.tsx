import SignupForm from '@/components/auth/signup-form'
import React from 'react'


function SignupPage() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-full md:w-[480px]'><SignupForm /></div>
    </div>
  )
}

export default SignupPage