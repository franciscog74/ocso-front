'use server';
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import axios from "axios";

export async function deleteLocation(formData: FormData) {
    const locationId = formData.get("deleteValue");
    if (!locationId)
        return;
    const del = await axios.delete(`${API_URL}/locations/${locationId}`, {
        headers: {
            ...authHeaders()
        }
    });
}