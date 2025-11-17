'use server';
import { API_URL } from "@/constants";

export default async function updateUser(userId: string, formData: FormData) {
    const user: any = {};
    user.userEmail = formData.get("userEmail");
    user.userPassword = formData.get("userPassword");
    if (!user.userPassword) delete user.userPassword;
    const response = await fetch(`${API_URL}/auth/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(user),
        credentials: "include"
    }).catch();
}