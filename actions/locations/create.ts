'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import axios from "axios";

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
    await axios.post(`${API_URL}/locations`, location, {
        headers: {
            ...authHeaders()
        }
    }).catch();
}