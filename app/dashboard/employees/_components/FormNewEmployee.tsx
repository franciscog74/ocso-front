import createEmployee from "@/actions/employees/create";
import { API_URL } from "@/constants";
import { Employee, Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input } from "@nextui-org/react";
import SelectStore from "./SelectStore";

export default async function FormNewEmployee() {
    const response = await fetch(`${API_URL}/locations`, {
        method: "GET",
        headers: {
            ...authHeaders()
        }
    }).catch();
    const locations: Location[] = await response.json();
    locations.unshift({
        locationId: 0,
        locationName: "Ninguna",
        locationLatLng: [0, 0],
        locationAddress: "No existe"
    });
    return (
        <form action={createEmployee} className="flex flex-col gap-2 p-4 m-2 bg-orange-300
            h-fit rounded-lg"
        >
            <Input isRequired name="employeeName" placeholder="Marco" label="Nombre" />
            <Input isRequired name="employeeLastName" placeholder="Aurelio" label="Apellidos" />
            <Input isRequired name="employeePhone" placeholder="0123456789" label="Teléfono" />
            <Input isRequired name="employeeEmail" placeholder="marco@correo.com" label="Email" />
            <Input name="employeePhoto" type="file" label="Foto" accept="image/png,image/jpeg" />
            <SelectStore locations={locations} />
            <Button type="submit" color="primary">
                Subir
            </Button>
        </form>
    );
}