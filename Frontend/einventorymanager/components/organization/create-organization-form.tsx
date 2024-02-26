'use client'

import { CreateOrgaizationFormSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import CardWrapper from '../auth/card-warpper'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import FormError from '../others/form-error'
import FormSuccess from '../others/form-success'
import { Button } from '../ui/button'
import axios from 'axios'

// export interface TimeZone {
//     id: string,
// }

export interface CountryInterface {
    country: string,
    timezones: string[]
}

// Mock
const countryList = [
    {country: 'United States of America', timezones: ['GMT']},
    {country: 'Ghana', timezones: ['GMT']},
    {country: 'Nigeria', timezones:['GMT']},
    {country: 'South Africa', timezones: ['GMT']}
]


function CreateOrganizationForm() {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof CreateOrgaizationFormSchema >>({
        resolver: zodResolver(CreateOrgaizationFormSchema)
    })

    // Country and timezone
    const [countries, setCountries] = useState<CountryInterface[]>(countryList)
    const [selectedCountry, setSelectedCountry] = 
    useState<CountryInterface | null>(null)
    const [selectedTimeZone, setSelectedTimeZone] =
    useState('')

    const handleCountryChange = (countryCode: string) => {
        console.log('Country: ', countryCode);
        const country = countries.find((c) => c.country === countryCode);
        setSelectedCountry(country || null);
        setSelectedTimeZone('');
    }

    const handleTimeZoneChange = (timeZoneCode: string = '') => {
        const timeZone = selectedCountry?.timezones.find((c) => c === timeZoneCode)
        if (!timeZone) setSelectedTimeZone('')
        else setSelectedTimeZone(timeZone)
    }


    const onSubmit = async (values: z.infer<typeof CreateOrgaizationFormSchema>) => {
        try {
            const response = await axios.post('https://test-goinventorymanager.koyeb.app/', values)
        } catch (error) {
            
        }
    }


  return (
    <CardWrapper
        title='Creat organization'
        description='Enter oranization details below and click submit.'
    >
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 w-full'
            >
                <div className='space-y-4 w-full'>
                    <div className='w-full px-4 rounded-md border border-input flex items-center'>
                        <div className='border-r min-w-max border-input pr-4'>
                            <p className='text-muted-foreground'>Name</p>
                        </div>
                        <FormField
                        control={form.control}
                        name='name'
                        render={({ field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    className='shadow-none border-none'
                                    {...field}
                                    disabled={isPending}
                                    placeholder='Stans Tech House'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            className='shadow-none'
                                            {...field}
                                            disabled={isPending}
                                            placeholder='Stans Tech House'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-full px-4 rounded-md border border-input flex items-center'>
                        <div className='border-r min-w-max border-input pr-4'>
                            <FormField
                                control={form.control}
                                name='country'
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handleCountryChange(value);
                                            }}
                                            defaultValue={field.value}>
                                            <FormControl className='w-full'>
                                                <SelectTrigger className='border-none border-r pr-0 mr-0 text-right w-full flex-grow focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none'>
                                                    <SelectValue placeholder='Select your country' className='border-none pr-0 mr-0 text-right w-full flex-grow focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {countries?.map((cnt) => (
                                                    <SelectItem key={cnt.country} value={cnt.country}>
                                                        {cnt.country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                        control={form.control}
                        name='timezone'
                        render={({ field}) => (
                            <FormItem>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        handleTimeZoneChange(value)
                                    }} defaultValue={field.value}>
                                    <FormControl className='w-full'>
                                        <SelectTrigger disabled={!form.getValues().country || isPending} className='border-none'>
                                            <SelectValue placeholder='Select timezone' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {selectedCountry?.timezones?.map((tz) => (
                                            <SelectItem key={tz} value={tz}>
                                                {tz}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-full px-4 rounded-md border border-input flex items-center'>
                        <div className='border-r min-w-max border-input pr-4'>
                            <p className='text-muted-foreground'>Mobile</p>
                        </div>
                        <FormField
                        control={form.control}
                        name='mobile'
                        render={({ field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    className='shadow-none border-none'
                                    {...field}
                                    disabled={isPending}
                                    placeholder='054412124'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className='w-full px-4 rounded-md border border-input flex items-center'>
                        <div className='border-r min-w-max border-input pr-4'>
                            <p className='text-muted-foreground'>Address</p>
                        </div>
                        <FormField
                        control={form.control}
                        name='address'
                        render={({ field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    className='shadow-none border-none min-w-full flex-1'
                                    {...field}
                                    disabled={isPending}
                                    placeholder='Shop No 54, Kaneshie Market'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                </div>
                <FormError />
                <FormSuccess />
                <Button type='submit' size='lg' className='w-full font-semibold'>Submit</Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default CreateOrganizationForm