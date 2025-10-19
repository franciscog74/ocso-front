'use server';

import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLocation(store: string, formData: FormData) {
    const location: any = {};
    const latLng = [0, 0];
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            if (key === "locationLat")
                latLng[0] = +value;
            else if (key === "locationLong")
                latLng[1] = +value;
            else
                location[key] = value;
        }
    }
    location.locationLatLng = latLng;
    const response = await fetch(`${API_URL}/locations/${store}`, {
        method: "PATCH",
        body: JSON.stringify(location),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 200) {
        revalidateTag("dashboard:locations");
        revalidateTag(`dashboard:locations:${store}`);
        redirect(`/dashboard?store=${store}`);
    }
}