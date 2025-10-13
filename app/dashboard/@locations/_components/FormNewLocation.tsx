import { Button, Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import SelectManager from "./SelectManager";
import { Manager, Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

export default async function FormNewLocation() {
    const headers = {
        ...authHeaders()
    };

    const managerResponse = await fetch(`${API_URL}/managers`, {
        method: "GET",
        headers,
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const managerData: Manager[] = await managerResponse.json();

    const locationResponse = await fetch(`${API_URL}/locations`, {
        method: "GET",
        headers,
        next: {
            tags: ["dashboard:locations"]
        }
    });
    const locationData: Location[] = await locationResponse.json();

    return (
        <form action={createLocation} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear Tienda</h1>
            <Input required={true} label="Nombre" placeholder="Ocso Jurikiya" name="locationName" />
            <Input required={true} label="Dirección" placeholder="Av. de la Luz S/N" name="locationAddress" />
            <Input required={true} label="Latitud" placeholder="-120" name="locationLat" />
            <Input required={true} label="Longitud" placeholder="20" name="locationLong" />
            <SelectManager managers={managerData} locations={locationData} />
            <Button type="submit" color="primary">Subir</Button>
        </form>
    );
}