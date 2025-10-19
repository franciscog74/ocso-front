import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./[id]/_components/ProviderCard";
import Link from "next/link";
import NewProvider from "./_components/NewProvider";
import FormNewProvider from "./_components/FormNewProvider";

export default async function ProvidersPage() {
    const response = await fetch(`${API_URL}/providers`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:providers"]
        }
    });
    const providers: Provider[] = await response.json();

    return (
        <div className="flex flex-col flex-grow-0 h-[90vh] px-10 pt-10 w-11/12">
            <NewProvider>
                <FormNewProvider key={"0"} />
            </NewProvider>
            <div className="w-full flex flex-wrap pb-10 overflow-hidden overflow-y-auto">
                {providers.map((provider) => (
                    <Link className="hover:scale-105 transition-transform"
                        href={{ pathname: `/dashboard/providers/${provider.providerID}` }}>
                        <ProviderCard provider={provider} key={provider.providerID} />
                    </Link>
                ))}
            </div>
        </div>
    );
}