'use client'

import { useUser } from '@/contexts/user-context'
import React from 'react'

function UserPage() {
  const { user } = useUser()
  return (
    <div>UserPage {user?.email}</div>
  )
}

export default UserPage