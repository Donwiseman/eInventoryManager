import React from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import LoginForm from '@/components/auth/login-form'
import { SignupSchema } from '@/schemas'
import SignupForm from '@/components/auth/signup-form'
import { MdClose as CloseIcon } from 'react-icons/md'


interface AuthPopupProps {
  title: string,
  type: string
}


function AuthPopup(
  {type, title}: AuthPopupProps
) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{title}</AlertDialogTrigger>
        <AlertDialogContent>
          <div className='w-8 h-8 pt-4'>
            <AlertDialogCancel><CloseIcon className='text-xl'/></AlertDialogCancel>
          </div>
          <div className=''>
            {type === 'login' ? <LoginForm /> : type === 'signup' ? <SignupForm /> : ''}
          </div>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AuthPopup