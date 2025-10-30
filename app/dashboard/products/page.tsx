import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FormNewProduct from "./_components/FormNewProduct";

export default async function ProductsPage() {
    const response = await fetch(`${API_URL}/providers`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:providers"]
        }
    });
    const providers: Provider[] = await response.json();
    return (
        <div className="flex flex-col w-full h-[90vh] justify-center items-center">
            <FormNewProduct providers={providers} />
        </div>
    );
}