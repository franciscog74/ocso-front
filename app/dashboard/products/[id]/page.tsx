import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ProductCard from "./_components/ProductCard";
import FormUpdateProduct from "./_components/FormUpdateProduct";
import DeleteProduct from "./_components/DeleteProduct";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const productResponse = await fetch(`${API_URL}/products/${id}`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:products", `"dashboard:products:${id}`]
        }
    });

    const product: Product = await productResponse.json();

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
        <div className="w-full flex flex-row">
            <div className="w-6/12 grid items-center">
                <div className="bg-orange-400 py-4 mx-10 px-10 flex flex-col w-auto
                rounded-lg font-bold text-white text-center items-center">
                    <h1 className="text-2xl pb-2">Nombre del producto: {product.productName}</h1>
                    <h2 className="text-medium">Precio: ${product.price}</h2>
                    <h2 className="text-medium">No. de sellos: {product.sealCount}</h2>
                </div>
                <DeleteProduct productID={id} />
            </div>
            <div className="w-6/12 items-center">
                <FormUpdateProduct product={product} providers={providers} />
            </div>
        </div>
    );
}