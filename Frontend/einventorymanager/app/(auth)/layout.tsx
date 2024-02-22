import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { HiOutlineHome as HomeIcon } from "react-icons/hi";
import { home } from '@/components/urls'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "user auth",
  description: "User and login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen flex justify-center items-center flex-col`}>
  
        <main>
          <section className='mb-4'>
            <Link href={home} className='flex flex-col-2 items-center text-gray-500 hover:text-gray-900'>
              <span className="border border-2 border-green-200 rounded flex justify-center p-2 hover:border-green-400">
                <HomeIcon className="text-green-200 hover:text-green-400" />
              </span>
            </Link>
          </section>
          {children}
        </main>
      </body>
    </html>
  );
}
