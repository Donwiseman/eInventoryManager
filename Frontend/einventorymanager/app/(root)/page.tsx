'use client'

import IframeEmbed from "@/components/others/ifram-embed";
import MenuDrawer from "@/components/others/menu-drawer";
import Link from "next/link";
import { useState } from "react";
import {
  IoLogoInstagram as InstramIcon,
  IoLogoTwitter as TwitterIcon,
  IoLogoFacebook as FacebookIcon,
  IoLogoYoutube as YouTubeIcon
 } from "react-icons/io";
import { GoCheckCircle } from 'react-icons/go'
import { PiNotepad } from 'react-icons/pi'
import { TiShoppingCart } from 'react-icons/ti'
import { FaRegStar as StarIcon } from "react-icons/fa6";
import heroImage from '@/assets/images/heroImage.png'
import Image from "next/image";
import AuthPopup from "@/components/others/auth-popup";

import { login, signup, home } from '@/components/urls';

import PublicNavbar from "@/components/others/public-navbar";
import PublicFooter from "@/components/others/public-footer";


export default function Home() {
  const [showMenu, setShowMenu] = useState(false)

  const onMenuClick = () => {
    setShowMenu(!showMenu)
  }

  return (
    <main className="relative min-h-screen">
      <div className="space-y-20">
        <div className="md:flex justify-center space-y-10 md:space-x-12 items-center pl-4 md:pl-16">
          <div className="md:w-4/5 md:pl-12 space-y-3">
            <h1 className='font-bold text-7xl text-green-600'>Ways to manage your inventory?</h1>
            <p className="text-xl font-medium text-neutral-600">
              Forget the old ways.
              You can do it walking. You can do it travelling.
              You can do it on go
            </p>
            <Link href={signup} className="text-white block w-max font-medium px-6 py-2 rounded-full bg-green-600">Get started</Link>
          </div>
          <div className="md:w-3/5 md:pr-0 pr-4">
              <Image src={heroImage} alt='hero image' className='md:w-3/5'/>
          </div>
        </div>
        <div className="md:flex md:space-x-12 space-y-10 md:space-y-0 px-4 md:justify-center">
          <IframeEmbed embedId="BNmyYzosV-E?si=SApQmVW-OSbgWbLc"/>
          <div className="space-y-4 p-0">
            <h2 className='font-bold text-4xl m-0 p-0'>Up your work game, it’s easy</h2>
            <div className="space-y-3">
              <div className="flex gap-6">
                <GoCheckCircle className='text-xl'/>
                <div>
                  <h3 className="font-bold">No hassle</h3>
                  <p>Sign up as easy as clicking a button</p>
                </div>
              </div>
              <div className="flex gap-6">
                <TiShoppingCart className='text-xl'/>
                <div>
                  <h3 className="font-bold">Manage your inventory</h3>
                  <p>Know exactly how your inventory is moving.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <PiNotepad className='text-xl'/>
                <div>
                  <h3 className="font-bold">Reports</h3>
                  <p>Generate reports like a magician.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <div className="bg-green-600 hover:bg-green-400 hover:cursor-pointer rounded-full w-full text-center px-8 py-1.5 text-white">
                  <Link href={login}>Login to your account</Link>
                </div>
                <div className="border-2 border-green-600 hover:cursor-pointer text-green-600 hover:border-green-400 w-full text-center rounded-full px-8 py-1.5">
                  <Link href={signup}>Sign up for free</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 px-4 md:px-20">
          <h1 className="font-bold text-4xl">Super rich features and functionalities</h1>
          <p className='font-medium text-neutral-600'>A look at some of our features for a compreemsize application.</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 pt-6">
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
            <div className='space-y-4 p-6 rounded-md bg-neutral-200 text-neutral-800'>
              <h1 className='font-bold text-2xl;'>Organization customization</h1>
              <div className='flex gap-2 items-center'>
                <StarIcon className='text-green-600'/>
                <p>4.5/3409</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
