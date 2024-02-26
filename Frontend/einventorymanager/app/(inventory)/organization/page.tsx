'use client'


import CreateOrgaizationDrawer from '@/components/organization/create-organization-drawer'
import CreateOrgaizationPopup from '@/components/organization/create-organization-popup'
import React, { useEffect, useState, useTransition } from 'react'
import Navbar from '../../../components/others/navbar'
import SpaceHelper4 from '@/components/others/space-helper-4'
import { Organization } from '@/interface'
import axios from 'axios'
import { Accordion } from '@radix-ui/react-accordion'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Image from 'next/image'

// Delete starts ----------------------
import macdonalds from '@/assets/images/macdonals.png'
import papaye from '@/assets/images/papaye.jpg'

const orgsMock: Organization[] = [
  {
    id: '2871bgw28282922i22',
    name: 'Mac Donalds',
    country: 'Ghana',
    address: 'Shop No 43, Oxford street',
    created_at: 'Monday, April 13, 2022',
    creator_id: '342455',
    time_zone: 'GMT+1',
    mobile: '552228888',
    description: 'Ive got my camera on conversation\
    just have a conversation this is going on your YouTube channel and\
    I don\'t want it to go on your YouTube channel well don\'t \
    talk me then Carrie listen listen she\' \
    krie we are in Britain we\'re in a public\
    space we got fre countries first the matter is communist',
    image: 'https://th.bing.com/th/id/OIP.wzT_l_77gzZZNjAkSfVbjQHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7'
  },
  {
    id: '2871bgw2828238302i22',
    name: 'Papaye',
    country: 'Nigeria',
    address: 'Market Avenue, Lagos',
    created_at: 'Thursday, July 12, 2021',
    creator_id: '342455',
    time_zone: 'GMT+1',
    mobile: '248882129',
    description: 'Brendan continues to stick up for\
    himself and this causes her to start\
    getting kind of nervous and annoyed at the same\
    time then br starts to completely \
    dismantle her argument and show her that\
    she\'s being unreasonable and not doing things',
    image: 'data:image/png;base64,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'
  },
]


// Delete ends ----------------------


function OrganizationPages() {
  const [isPending, startTransition] = useTransition()
  const [organizations, setOrganizations] = useState<Organization[]>(orgsMock)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // FOR ACTUAL ORGS
  // useEffect(() => {
  //   const getAllOrganizations = () => {
  //     startTransition(async () => {
  //       await axios.get('https://test-goinventorymanager.koyeb.app/organizations')
  //       .then((res) => {
  //           if (res.status === 200) {
  //             setOrganizations(res.data.organizations)
  //           }
  //           else {
  //             setErrorMessage(res.statusText)
  //           }
  //       })
  //       .catch(() => setErrorMessage('Somethin went wrong. Please reload page'))
  //     })
  //   }
  // }, [setOrganizations])

  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='fixed top-0 left-0 h-[70px] bg-slate-400 md:h-14 w-full'>
        <Navbar />
      </div>
      <div className='flex flex-1 flex-col px-4 pt-[76px] md:pt-14'>
        <SpaceHelper4 />
        <div className='w-full hidden md:flex'>
              <CreateOrgaizationPopup />
          </div>
          <div className='w-full md:hidden'>
              <CreateOrgaizationDrawer />
        </div>
        <div className='w-full flex-grow'>
          <div className='w-full h-full grid grid-cols-1 md:grid-cols-2'>
            <Accordion type='multiple' className='w-full'>
              <div className='w-full pt-8'>
                <p className='text-3xl font-extrabold'>Your organizations</p>
              </div>
              {organizations.map((org) => (
                <AccordionItem value={org.id} key={org.id}>
                    <AccordionTrigger>
                      <div className='flex gap-4 items-center'>
                        <img alt='image' src={org.image} className='w-14 h-14 rounded-xl'/>
                        <div className=''>
                            <p className='text-left font-extrabold'>{org.name} | {org.country}</p>
                            <p className='text-xs text-muted-foreground truncate'>{org.address} | {org.mobile}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='w-full'>
                        {org.image && (
                          
                          <img alt='text' src={org.image} className='rounded-xl h-60 w-full'/>
                        )}
                        <div className='py-4'>
                          <span className='font-bold text-sx text-muted-foreground'>Description</span>
                          <p className='text-muted-foreground text-xs overflow-hidden line-clamp-2'>
                            {org.description}</p>
                        </div>
                      </div>
                    </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <SpaceHelper4 />
      </div>
      
    </div>
  )
}

export default OrganizationPages