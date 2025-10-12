import { Button, Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import axios from "axios";
import { API_URL } from "@/constants";
import SelectManager from "./SelectManager";
import { Manager, Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

export default async function FormNewLocation() {
    const config = {
        headers: {
            ...authHeaders()
        }
    };

    const managerResponse = await axios.get<Manager[]>(`${API_URL}/managers`, config);

    const locationResponse = await axios.get<Location[]>(`${API_URL}/locations`, config);

    return (
        <form action={createLocation} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear Tienda</h1>
            <Input label="Nombre" placeholder="Ocso Jurikiya" name="locationName" />
            <Input label="Dirección" placeholder="Av. de la Luz S/N" name="locationAddress" />
            <Input label="Latitud" placeholder="-120" name="locationLat" />
            <Input label="Longitud" placeholder="20" name="locationLong" />
            <SelectManager managers={managerResponse.data} locations={locationResponse.data} />
            <Button type="submit" color="primary">Subir</Button>
        </form>
    );
}