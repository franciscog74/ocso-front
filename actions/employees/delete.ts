'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteEmployee(employeeId: string) {
    if (!employeeId)
        return;
    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
        method: "DELETE",
        headers: {
            ...authHeaders()
        }
    }).catch();
    if (response.status === 200){
        revalidateTag("dashboard:employees");
        redirect("/dashboard/employees");
    }
}