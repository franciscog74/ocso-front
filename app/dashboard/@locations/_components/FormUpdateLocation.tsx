import { Button, Input } from "@nextui-org/react";
import { API_URL } from "@/constants";
import SelectManager from "./SelectManager";
import { Manager, Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { updateLocation } from "@/actions/locations/update";

export default async function FormUpdateLocation({ store }: { store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return null;

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

    const foundLocation = locationData.find((location) => location.locationId === +store);
    const foundManager = foundLocation?.manager?.managerId ?? undefined;

    const updateWithStoreId = updateLocation.bind(null, store);

    return (
        <form action={updateWithStoreId} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Modificar Tienda</h1>
            <Input required={true} label="Nombre" defaultValue={foundLocation?.locationName} name="locationName" />
            <Input required={true} label="Dirección" defaultValue={foundLocation?.locationAddress} name="locationAddress" />
            <Input required={true} label="Latitud" defaultValue={foundLocation?.locationLatLng[0].toString()} name="locationLat" />
            <Input required={true} label="Longitud" defaultValue={foundLocation?.locationLatLng[1].toString()} name="locationLong" />
            <SelectManager defaultManager={foundManager} managers={managerData} locations={locationData} />
            <Button type="submit" color="primary">Actualizar</Button>
        </form>
    );
}