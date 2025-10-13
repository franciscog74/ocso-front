'use server';

import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(formData: FormData) {
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
    const response = await fetch(`${API_URL}/locations`, {
        method: "POST",
        body: JSON.stringify(location),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 201){
        const { locationId }: Location = await response.json();
        revalidateTag("dashboard:locations");
        redirect(`/dashboard?store=${locationId}`)
    }
}