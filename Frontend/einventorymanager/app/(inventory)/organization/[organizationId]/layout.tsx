'use client'
import Navbar from "@/components/others/navbar";
import Sidebar from "@/components/others/sidebar";
import { OrganizationProvider, useOrganization } from "@/contexts/organization-context";
import React, { useEffect } from "react";

interface InventoryManagementLayoutProps {
  params: {
    organizationId: string;
    children: React.ReactNode;
  };
}

const InventoryManagementLayout: React.FC<InventoryManagementLayoutProps> = ({ params }) => {
  const { organizationId, children } = params;

  const { fetchOrganization } = useOrganization();

  useEffect(() => {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiii')
    fetchOrganization(organizationId);
  }, [fetchOrganization, organizationId]);

  console.log(organizationId);

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
  );
};

export default InventoryManagementLayout;
