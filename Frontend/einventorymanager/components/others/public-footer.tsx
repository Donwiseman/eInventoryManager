import Link from 'next/link'
import React from 'react'
import {
    IoLogoInstagram as InstramIcon,
    IoLogoTwitter as TwitterIcon,
    IoLogoFacebook as FacebookIcon,
    IoLogoYoutube as YouTubeIcon
} from "react-icons/io";


function PublicFooter() {
  return (
    <footer className="mt-12 mb-4 mx-4 px-4 bg-green-800 rounded-3xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 text-white pt-12">
            <div className="space-y-3">
              <h1 className="font-semibold underline">Company</h1>
              <Link href='/about-us' className="font-medium text-sm block hover:underline">About Us</Link>
              <Link href='/leadership' className="font-medium text-sm block hover:underline">Leadership</Link>
              <Link href='/press' className="font-medium text-sm block hover:underline">Press</Link>
              <Link href='/contact-us' className="font-medium text-sm block hover:underline">Contact Us</Link>
              <Link href='/careers' className="font-medium text-sm block hover:underline">Careers</Link>
              <Link href='/investor relation' className="font-medium text-sm block hover:underline">Investor Relations</Link>
            </div>
            <div className="space-y-3">
              <h1 className="font-semibold underline">Help & Resources</h1>
              <Link href='/about-us' className="font-medium text-sm block hover:underline">Help: Oranization</Link>
              <Link href='/leadership' className="font-medium text-sm block hover:underline">Help: Admin</Link>
              <Link href='/press' className="font-medium text-sm block hover:underline">Help: Employee</Link>
              <Link href='/contact-us' className="font-medium text-sm block hover:underline">FAQ</Link>
              <Link href='/general' className="font-medium text-sm block hover:underline">General</Link>
            </div>
            <div className="space-y-3">
              <h1 className="font-semibold underline">Features</h1>
              <p className="font-medium">Create Oranization</p>
              <p className="font-medium">Add Branches</p>
              <p className="font-medium">Add Employees</p>
              <p className="font-medium">Manage Inventory</p>
              <p className="font-medium">Reports</p>
            </div>
            <div className="space-y-3">
              <h1 className="font-semibold underline">Other Information</h1>
              <Link href='/success-stories' className="font-medium text-sm block hover:underline">Success Stories</Link>
              <Link href='/go-reviews' className="font-medium text-sm block hover:underline">Go Reviews</Link>
              <Link href='/community' className="font-medium text-sm block hover:underline">Community</Link>
              <Link href='/blog' className="font-medium text-sm block hover:underline">Blog</Link>
              <Link href='/general' className="font-medium text-sm block hover:underline">General</Link>
            </div>
          </div>
          <div className="flex md:justify-center items-center font-medium text-white space-x-4 py-8">
            <p>Connect with us   </p>
            <Link href='www.instagram.com/'>
              <InstramIcon />
            </Link>
            <Link href='www.twitter.com'>
              <TwitterIcon />
            </Link>
            <Link href='www.facebook.com'>
              <FacebookIcon />
            </Link>
            <Link href='www.youtube.com'>
              <YouTubeIcon />
            </Link>
          </div>
          <div className="md:flex md:justify-center items-center font-medium md:space-x-8 space-y-4 text-white py-12 border-t border-white">
            <span className="block md:inline">© 2024 Go® Global Inc.</span>
            <Link href='/terms-of-service' className="block md:inline hover:underline md:pb-4">Terms of Service</Link>
            <Link href='/privacy-policy' className="block md:inline hover:underline md:pb-4">Privacy Policy</Link>
          </div>
      </footer>
  )
}

export default PublicFooter