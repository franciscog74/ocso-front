'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProvider(providerId: string, formData: FormData) {
    const provider: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            provider[key] = value;
        }
    }
    if (!provider.providerPhone) provider.providerPhone = null;

    const response = await fetch(`${API_URL}/providers/${providerId}`, {
        method: "PATCH",
        body: JSON.stringify(provider),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 200){
        revalidateTag("dashboard:providers");
        revalidateTag(`dashboard:providers:${providerId}`);
        redirect(`/dashboard/providers/${providerId}`);
    }
}