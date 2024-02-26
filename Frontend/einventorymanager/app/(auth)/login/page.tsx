import LoginForm from '@/components/auth/login-form'
import React from 'react'


function LoignPage() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-full md:w-[480px]'><LoginForm /></div>
    </div>
  )
}

export default LoignPage