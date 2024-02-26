import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/user-context";
import { OrganizationProvider } from "@/contexts/organization-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Go Inventory Manager",
  description: "Be on the go",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen custom-scrollbar`}>
        <UserProvider>
          <OrganizationProvider>
            {children}
          </OrganizationProvider>
        </UserProvider>
      </body>
    </html>
  );
}
