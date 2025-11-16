'use server';
import { API_URL } from "@/constants";
import { authHeaders } from "./authHeaders";

export default async function getImage(employeeId: string) {
    const response = await fetch(`${API_URL}/employees/${employeeId}/photo`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:employees", `dashboard:employees:${employeeId}`]
        }
    });

    var imageSrc;
    
    if (response.status === 200) {
        const type = response.headers.get("content-type");
        imageSrc = `data:${type};base64,` + Buffer.from(await response.bytes()).toString("base64");
    }

    return imageSrc;
}