'use client'


import { DataTable } from '@/components/utils/table-data'
import React, { useEffect, useMemo, useState } from 'react'
import { columns } from '@/components/utils/table-columns'
import { ItemsTableSchema } from '@/schemas'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { FaSearch as SearcIcon } from 'react-icons/fa'
import { Button } from '@/components/ui/button'


function ItemsPage() {
  const items = [
    {
      id: '2',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '3',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '4',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '5',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '1',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '2',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '3',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '4',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '5',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '1',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    },
    {
      id: '2',
      name: 'Milk',
      description: 'Ideal milk',
      price: 12,
      quantity: 200
    }
  ]

  const [tableData, setTableData] = useState<typeof ItemsTableSchema[]>()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<typeof ItemsTableSchema[]>() 


  return (
    <div className='flex-1'>
      <div className=''>
        <p className='font-extrabold text-center flex justify-center items-center h-20 text-3xl'>Purchases</p>
        <div className='w-full flex justify-center items-center'>
          <Input
            type='search'
            className='max-w-[480px] shadow-none border-r-none rounded-r-none'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className='rounded-l-none'><SearcIcon /></Button>
        </div>
      </div>
      <DataTable columns={columns} data={items}/>
      <div className='h-4'></div>
    </div>
  )
}

export default ItemsPage