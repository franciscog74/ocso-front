'use client';
import { Provider } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectProvider({
    providers,
    defaultProvider
}: {
    providers: Provider[],
    defaultProvider?: string
}) {
    return (
        <Select label="Proveedor" name="provider" isRequired={true}
            defaultSelectedKeys={defaultProvider ? [defaultProvider] : []}
        >
            {providers.map(provider => (
                <SelectItem key={provider.providerID} value={provider.providerID}>
                    {provider.providerName}
                </SelectItem>
            ))}
        </Select>
    );
}