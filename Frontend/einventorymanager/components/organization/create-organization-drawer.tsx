import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import CreateOrganizationForm from './create-organization-form'
import { Button } from '../ui/button'
import Logo from '../others/logo'

function CreateOrgaizationDrawer() {
  return (
    <Drawer>
        <DrawerTrigger>
            <Button>
                Create organization
            </Button>
        </DrawerTrigger>
        <DrawerContent className='w-full'>
            <CreateOrganizationForm />
        </DrawerContent>
    </Drawer>
  )
}

export default CreateOrgaizationDrawer