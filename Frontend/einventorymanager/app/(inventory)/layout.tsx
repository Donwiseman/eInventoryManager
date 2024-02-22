//import Dashboard from "@/components/organization/dashboard";
import Navbar from "@/components/others/navbar";
import Sidebar from "@/components/others/sidebar";
import React from "react";

export default function InventoryManagementLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>
) {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="h-screen overflow-hidden flex-grow flex flex-col">
                <div className="stick top-0 z-10">
                    <Navbar />
                </div>
                <div className="px-4 bg-secondary overflow-auto flex-1 flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    )
}