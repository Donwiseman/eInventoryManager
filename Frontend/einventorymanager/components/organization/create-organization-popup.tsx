import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import CreateOrganizationForm from './create-organization-form'
import { Button } from '../ui/button'

function CreateOrgaizationPopup() {
  return (
    <Dialog>
        <DialogTrigger>
            <Button>
                Create organization
            </Button>
        </DialogTrigger>
        <DialogContent className=''>
            <CreateOrganizationForm />
        </DialogContent>
    </Dialog>
  )
}

export default CreateOrgaizationPopup