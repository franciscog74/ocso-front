'use server';

import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createManager(formData: FormData) {
    const manager: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            if (key === "managerSalary")
                manager[key] = +value;
            else
                manager[key] = value;
        }
    }
    if (!manager.location) delete manager?.location;
    else manager.location = +manager.location;
    const response = await fetch(`${API_URL}/managers`, {
        method: "POST",
        body: JSON.stringify(manager),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 201){
        const { managerId }: Manager = await response.json();
        revalidateTag("dashboard:managers");
        redirect(`/dashboard/managers/${managerId}`);
    }
}