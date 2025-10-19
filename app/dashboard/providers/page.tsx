import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./[id]/_components/ProviderCard";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";

export default async function ProvidersPage() {
    const response = await fetch(`${API_URL}/providers`, {
        headers: {
            ...authHeaders()
        }
    });
    const providers: Provider[] = await response.json();

    return (
        <div className="flex flex-col flex-grow-0 h-[90vh] pt-10">
            <Button className="w-fit self-center" color="primary">
                <LuPlus size={20} />
            </Button>
            <div className="w-4/12 flex flex-row flex-wrap px-10 overflow-hidden overflow-y-auto">
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