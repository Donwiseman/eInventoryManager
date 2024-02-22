import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { HiOutlineMenuAlt3 as MenuIcon } from 'react-icons/hi'
import Link from "next/link"
import { HiOutlineHome as HomeIcon } from "react-icons/hi";
import { MdOutlineInfo as AboutUsIcon } from "react-icons/md";
import { TbBrandStorytel as OurStoryIcon } from "react-icons/tb";
import { LuPhone as ContactUsIcon } from "react-icons/lu";
import { CiLogin as LoginIcon } from "react-icons/ci";


export default function MenuDrawer () {
    return (
        <Drawer>
        <DrawerTrigger><MenuIcon className='text-2xl'/></DrawerTrigger>
        <DrawerContent>
            <div className="space-y-6 px-4 py-6">
                <Link href='/' className="flex gap-3 items-center">
                    <HomeIcon className="text-2xl" />
                    <h1 className=" text-gray-800 hover:text-green-600 transition-colors duration-300">Home</h1>
                </Link>
                <Link href='/about-us' className="flex gap-3 items-center">
                    <AboutUsIcon className="text-2xl"/>
                    <h1 className="text-gray-800 hover:text-green-600 transition-colors duration-300">About us</h1>
                </Link>
                <Link href='/our-story' className="flex gap-3 items-center">
                    <OurStoryIcon className="text-xl"/>
                    <h1 className=" text-gray-800 hover:text-green-600 transition-colors duration-300">Our story</h1>
                </Link>
                <Link href='/contact-us' className="flex gap-3 items-center">
                    <ContactUsIcon className="text-xl"/>
                    <h1 className=" text-gray-800 hover:text-green-600 transition-colors duration-300">Contact us</h1>
                </Link>
                <Link href='/login' className="flex gap-3 items-center">
                  <LoginIcon className="text-2xl text-green-900"/>
                  <h1 className="py-1.5 text-green-900">Login</h1>
                  
                </Link>
            </div>
            <DrawerFooter>
                <div className="flex-grow text-center border-t pt-4">
                    <h1 className="text-xl font-semibold text-neutral-600">
                        <span className="text-2xl font-extrabold text-green-600">go</span> Inventory Manager
                    </h1>
                </div>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
 
    )
}