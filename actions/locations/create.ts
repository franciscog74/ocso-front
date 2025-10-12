'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

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
            ...authHeaders()
        }
    }).catch();
    if (response.status === 201)
        revalidateTag("dashboard:locations");
}