'use server';

import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProvider(formData: FormData) {
    const provider: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            provider[key] = value;
        }
    }
    if (!provider.providerPhone) provider.providerPhone = null;
    const response = await fetch(`${API_URL}/providers`, {
        method: "POST",
        body: JSON.stringify(provider),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 201) {
        const { providerID }: Provider = await response.json();
        revalidateTag("dashboard:providers");
        redirect(`/dashboard/providers/${providerID}`);
    }
}