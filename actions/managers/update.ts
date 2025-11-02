'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateManager(managerId: string, formData: FormData) {
    const manager: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            manager[key] = value;
        }
    }
    manager.managerSalary = +manager.managerSalary;

    if (!manager.location) delete manager?.location;
    else manager.location = +manager.location;

    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify(manager),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 200){
        revalidateTag("dashboard:managers");
        revalidateTag(`dashboard:managers:${managerId}`);
        redirect(`/dashboard/managers/${managerId}`);
    }
}