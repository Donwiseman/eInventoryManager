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
    description?: string,
    backButtonLabel?: string,
    backButtonHref?: string,
}

export default function CardWrapper ({
    children,
    title,
    description,
    backButtonLabel,
    backButtonHref,
}: cardWrapperProps) {
    return (
        <Card className="w-full md:shadow-md rounded-md pt-6 h-full px-4">
            <CardHeader>
                <h1 className="font-extrabold text-4xl">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent className="px-4">
                {children}
            </CardContent>
            <CardFooter>
                <div className="pt-6 text-center w-full flex justify-center items-center">
                    <Link className="text-center text-blue-600" href={backButtonHref || ''}>{backButtonLabel}</Link>
                </div>
            </CardFooter>
        </Card>
    )
}