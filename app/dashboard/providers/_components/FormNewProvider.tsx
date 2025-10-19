import { Button, Input } from "@nextui-org/react";
import createProvider from "@/actions/providers/create";

export default async function FormNewProvider() {
    return (
        <form action={createProvider} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear Proveedor</h1>
            <Input isRequired={true} label="Nombre" placeholder={"Coca Cola"} name="providerName" />
            <Input isRequired={true} label="Email" placeholder={"correo@empresa.com"} name="providerEmail" />
            <Input label="Teléfono" placeholder={"1234567890"} name="providerPhone" />
            <Button type="submit" color="primary">Subir</Button>
        </form>
    );
}