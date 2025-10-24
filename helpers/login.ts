'use client';
import { API_URL } from "@/constants";

export default async function login(authData: {
    userEmail: string | undefined,
    userPassword: string | undefined
}) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(authData),
            credentials: "include"
        });
        return response.status;
    } catch (e) {
        return 500;
    }
}