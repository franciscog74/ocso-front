'use server';

import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const product: any = {};
    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (value) {
            product[key] = value;
        }
    }
    product.price = +product.price;
    product.sealCount = +product.sealCount;
    
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'content-type': 'application/json',
            ...authHeaders()
        }
    }).catch();
    if (response.status === 201) {
        const { productID }: Product = await response.json();
        revalidateTag("dashboard:products");
        redirect(`/dashboard/products/${productID}`);
    }
}