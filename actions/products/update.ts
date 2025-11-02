'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(productID: string, formData: FormData) {
    const product: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            product[key] = value;
        }
    }
    product.price = +product.price;
    product.sealCount = +product.sealCount;
    
    const response = await fetch(`${API_URL}/products/${productID}`, {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 200) {
        revalidateTag("dashboard:products");
        revalidateTag(`dashboard:products:${productID}`);
        redirect(`/dashboard/products/${productID}`);
    }
}