import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import SearchProduct from "./_components/SearchProduct";
import { ReactNode } from "react";

export default async function ProductsLayout({ children }: { children: ReactNode }) {
    const productResponse = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:products"]
        }
    });
    const products: Product[] = await productResponse.json();

    const providerResponse = await fetch(`${API_URL}/providers`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:providers"]
        }
    });
    const providers: Provider[] = await providerResponse.json();

    return (
        <div className="h-[90vh] w-11/12 flex flex-row">
            <SearchProduct providers={providers} products={products} />
            <div className="flex flex-col w-8/12 h-[90vh] justify-center items-center">
                {children}
            </div>
        </div>
    );
}