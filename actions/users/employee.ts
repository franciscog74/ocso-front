'use server';

import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

export default async function registerEmployee(employeeId: string, formData: FormData) {
    const user: any = {};
    user.userEmail = formData.get("userEmail");
    user.userPassword = formData.get("userPassword");
    const response = await fetch(`${API_URL}/auth/register/${employeeId}?role=Employee`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include"
    }).catch();
    if (response.status === 201) {
        revalidateTag("dashboard:employees");
        revalidateTag(`dashboard:employees:${employeeId}`);
    }
}