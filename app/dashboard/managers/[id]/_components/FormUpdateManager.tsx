import { Button, Input } from "@nextui-org/react";
import { Location, Manager } from "@/entities";
import updateManager from "@/actions/managers/update";
import SelectStore from "./SelectStore";
import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";

export default async function FormUpdateManager({ manager }: { manager: Manager }) {
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
    
    const updateWithManagerId = updateManager.bind(null, manager.managerId);

    return (
        <form action={updateWithManagerId} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Modificar Manager</h1>
            <Input isRequired={true} label="Nombre completo" defaultValue={manager.managerFullName} name="managerFullName" />
            <Input isRequired={true} label="Salario" defaultValue={manager.managerSalary.toString()} name="managerSalary" />
            <Input isRequired={true} label="Email" defaultValue={manager.managerEmail} name="managerEmail" />
            <Input isRequired={true} label="Teléfono" defaultValue={manager.managerPhone} name="managerPhone" />
            <SelectStore locations={locations} defaultStore={manager.location?.locationId} />
            <Button type="submit" color="primary">Actualizar</Button>
        </form>
    );
}