'use server';
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProduct(productID: string) {
    if (!productID)
        return;
    const response = await fetch(`${API_URL}/products/${productID}`, {
        method: "DELETE",
        headers: {
            ...authHeaders()
        }
    });
    if (response.status === 200){
        revalidateTag("dashboard:products");
        redirect("/dashboard/products");
    }
}