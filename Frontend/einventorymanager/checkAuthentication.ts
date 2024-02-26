import { NextRequest } from "next/server";

export default async function authenticateUser(request: NextRequest): Promise<boolean> {
    try {
        const cookies = request.cookies.getAll();
        const token = cookies.find(cookie => cookie.name === 'jwt')?.value;
        if (!token) return false;

        const response = await fetch('https://test-goinventorymanager.koyeb.app/api/v1/validate-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.status === 204;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}
