import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import checkAuthentication from "./checkAuthentication";

export default async function checkUserBelongsToOrganization(request: NextRequest): boolean {
    try {
        const isLoggedIn = await checkAuthentication(request)
        if (!isLoggedIn) return false
        
    } catch (error) {
        console.error(error)
        return false
    }
}