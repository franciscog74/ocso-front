'use server';

import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function registerManager(managerId: string, formData: FormData) {
    const user: any = {};
    user.userEmail = formData.get("userEmail");
    user.userPassword = formData.get("userPassword");
    const response = await fetch(`${API_URL}/auth/register/${managerId}?role=Manager`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include"
    }).catch();
    if (response.status === 201) {
        revalidateTag("dashboard:managers");
        revalidateTag(`dashboard:managers:${managerId}`);
        redirect(`/dashboard/managers/${managerId}`);
    }
}