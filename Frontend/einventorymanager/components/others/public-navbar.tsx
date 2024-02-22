import Link from 'next/link'
import React from 'react'
import MenuDrawer from '@/components/others/menu-drawer'
import AuthPopup from '@/components/others/auth-popup'
import { login, contact, about, story, home } from '@/components/urls';

function PublicNavbar() {
  return (
    <header className="sticky top-0 z-10 bg-background text-center md:text-start border-b px-4 mb-12 flex flex-row h-16 w-full justify-between items-center">
          <div className="flex-grow">
            <h1 className="text-xl font-semibold text-neutral-600">
              <span className="text-2xl font-extrabold text-green-600">go</span> Inventory Manager
            </h1>
          </div>
          <div className="block md:hidden">
            <MenuDrawer />
          </div>
          <div className="hidden md:flex md:items-center md:justify-end md:gap-8">
            <Link href={home}>
              <h1 className=" text-gray-800 hover:text-green-600 transition-colors duration-300">Home</h1>
            </Link>
            <Link href={about}>
              <h1 className="text-gray-800 hover:text-green-600 transition-colors duration-300">About us</h1>
            </Link>
            <Link href={story}>
              <h1 className=" text-gray-800 hover:text-green-600 transition-colors duration-300">Our story</h1>
            </Link>
            <Link href={contact}>
              <h1 className=" text-gray-800 hover:text-green-600 transition-colors duration-300">Contact us</h1>
            </Link>
            <Link href={login} className="bg-green-600 hover:bg-green-400 rounded-2xl px-8 py-1.5 text-white">
              Login
            </Link>
          </div>
    </header>
  )
}

export default PublicNavbar