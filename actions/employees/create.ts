'use server';

import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createEmployee(formData: FormData) {
    const employee: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (!key.startsWith("$ACTION")) {
            employee[key] = value;
        }
    }

    var employeeId: string | undefined;

    const photo = employee.employeePhoto;
    delete employee.employeePhoto;

    const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        body: JSON.stringify(employee),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    })
        .then(async (response) => {
            employeeId = ((await response.json()) as Employee).employeeId;
            if (photo.size && response.status === 201) {
                const form = new FormData();
                form.append("file", photo);
                return await fetch(`${API_URL}/employees/${employeeId}/upload`, {
                    method: "POST",
                    body: form,
                    headers: {
                        ...authHeaders()
                    }
                });
            }
            return response;
        })
        .catch();
    if (response.status === 201) {
        revalidateTag("dashboard:employees");
    }
}