'use client'

import React from "react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
 } from "@/components/ui/card"
import Link from "next/link"


interface cardWrapperProps {
    children: React.ReactNode,
    title: string,
    description: string,
    backButtonLabel: string,
    backButtonHref: string,
    styles?:string
}

export default function CardWrapper ({
    children,
    title,
    description,
    backButtonLabel,
    backButtonHref,
    styles,
}: cardWrapperProps) {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <h1 className={`font-extrabold text-4xl text-neutral-800 ${styles||''}`}>{title}</h1>
                <p className="text-sm text-neutral-500">{description}</p>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Link href={backButtonHref} className='w-full'>{backButtonLabel}</Link>
            </CardFooter>
        </Card>
    )
}