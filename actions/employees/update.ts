'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateEmployee(employeeId: string, formData: FormData) {
    const employee: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (key === "location") {
            employee[key] = value ? +value : null;
        }
        else if (!key.startsWith("$ACTION")) {
            employee[key] = value;
        }
    }

    const photo = employee.employeePhoto;
    delete employee.employeePhoto;

    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
        method: "PATCH",
        body: JSON.stringify(employee),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    })
        .then(async (response) => {
            if (photo.size && response.status === 200) {
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
    if (response.status === 200 || response.status === 201) {
        revalidateTag("dashboard:employees");
        revalidateTag(`dashboard:employees:${employeeId}`);
        redirect(`/dashboard/employees/${employeeId}`);
    }
}