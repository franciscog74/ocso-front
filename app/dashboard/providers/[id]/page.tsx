import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./_components/ProviderCard";
import { Provider } from "@/entities";
import ProductCard from "../../products/[id]/_components/ProductCard";
import Link from "next/link";

export default async function ProviderPage({ params: { id } }: { params: { id: string } }) {
    const response = await fetch(`${API_URL}/providers/${id}`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:providers", `dashboard:providers:${id}`]
        }
    });
    const provider: Provider = await response.json();
    return (
        <div className="flex flex-row h-[90vh] px-10 w-11/12">
            <div className="w-4/12 self-center">
                <ProviderCard provider={provider} />
            </div>
            <div className="w-8/12 flex flex-col py-5 gap-5 overflow-hidden overflow-y-auto">
                {provider.products ?
                    provider.products.map((product) =>(
                        <Link href={{pathname: `/dashboard/products/${product.productID}`}}
                            key={product.productID}
                            className="hover:scale-105 transition-transform">
                            <ProductCard product={product} />
                        </Link>
                    )) :
                    <p className="text-2xl">No tiene productos</p>
                }
            </div>
        </div>
    );
}