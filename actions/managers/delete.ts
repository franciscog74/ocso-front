'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteManager(managerId: string) {
    if (!managerId)
        return;
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "DELETE",
        headers: {
            ...authHeaders()
        }
    }).catch();
    if (response.status === 200){
        revalidateTag("dashboard:managers");
        redirect(`/dashboard/managers`);
    }
}