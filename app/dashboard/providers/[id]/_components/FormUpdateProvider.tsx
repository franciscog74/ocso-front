import { Button, Input } from "@nextui-org/react";
import { Provider } from "@/entities";
import updateProvider from "@/actions/providers/update";

export default async function FormUpdateProvider({ provider }: { provider: Provider }) {
    const updateWithProviderId = updateProvider.bind(null, provider.providerID);

    return (
        <form action={updateWithProviderId} className="bg-orange-200 py-4 mx-10 px-10 flex flex-col gap-4 w-auto rounded-lg">
            <Input isRequired={true} label="Nombre" defaultValue={provider.providerName} name="providerName" />
            <Input isRequired={true} label="Email" defaultValue={provider.providerEmail} name="providerEmail" />
            <Input label="Teléfono" defaultValue={provider.providerPhone ?? undefined} name="providerPhone" />
            <Button type="submit" color="primary">Actualizar</Button>
        </form>
    );
}