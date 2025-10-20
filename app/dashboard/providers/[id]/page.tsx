import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./_components/ProviderCard";
import { Provider } from "@/entities";
import ProductCard from "../../products/[id]/_components/ProductCard";
import Link from "next/link";
import FormUpdateProvider from "./_components/FormUpdateProvider";

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
        <div className="flex flex-row h-[90vh] px-10 w-11/12 overflow-hidden overflow-y-auto">
            <div className="w-4/12 self-center max-h-[90vh]">
                <ProviderCard provider={provider} />
                <div className="flex flex-col justify-center">
                    <FormUpdateProvider provider={provider} />
                </div>
            </div>
            <div className="w-8/12 flex flex-wrap py-5 gap-5 overflow-hidden overflow-y-auto">
                {provider.products?.length ?
                    provider.products.map((product) => (
                        <Link href={{ pathname: `/dashboard/products/${product.productID}` }}
                            key={product.productID}
                            className="hover:scale-105 transition-transform h-fit">
                            <ProductCard product={product} />
                        </Link>
                    )) :
                    <p className="text-2xl w-full self-center text-center">No tiene productos</p>
                }
            </div>
        </div>
    );
}