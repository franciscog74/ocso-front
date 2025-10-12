'use server';
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export async function deleteLocation(formData: FormData) {
    const locationId = formData.get("deleteValue");
    if (!locationId)
        return;
    const response = await fetch(`${API_URL}/locations/${locationId}`, {
        method: "DELETE",
        headers: {
            ...authHeaders()
        }
    });
    if (response.status === 200)
        revalidateTag("dashboard:locations");
}