'use client';
import { Provider } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectProvider({ providers }: { providers: Provider[] }) {
    return (
        <Select label="Proveedor" name="provider" isRequired={true} >
            {providers.map(provider => (
                <SelectItem key={provider.providerID} value={provider.providerID}>
                    {provider.providerName}
                </SelectItem>
            ))}
        </Select>
    );
}