import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SearchProduct from "./_components/SearchProduct";

export default async function ProductsPage() {
    const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:products"]
        }
    });
    const products: Product[] = await response.json();
    return (
        <SearchProduct products={products} />
    );
}