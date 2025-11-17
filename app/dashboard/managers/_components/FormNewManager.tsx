import { Button, Input } from "@nextui-org/react";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import SelectStore from "../[id]/_components/SelectStore";
import createManager from "@/actions/managers/create";

export default async function FormNewManager() {
    const locationResponse = await fetch(`${API_URL}/locations`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations"]
        }
    });

    const locations: Location[] = await locationResponse.json();
    
    return (
        <form action={createManager} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear Manager</h1>
            <Input isRequired={true} label="Nombre completo" placeholder="Juanito Perez" name="managerFullName" />
            <Input isRequired={true} label="Salario" placeholder="10000" name="managerSalary" />
            <Input isRequired={true} label="Email" placeholder="correo@ejemplo.com" name="managerEmail" />
            <Input isRequired={true} label="Teléfono" placeholder="0123456789" name="managerPhone" />
            <SelectStore locations={locations} />
            <Button type="submit" color="primary">Subir</Button>
        </form>
    );
}