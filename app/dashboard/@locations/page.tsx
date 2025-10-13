import { API_URL } from "@/constants";
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { authHeaders } from "@/helpers/authHeaders";
import UpdateLocation from "./_components/UpdateLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    const response = await fetch(`${API_URL}/locations`, {
        method: "GET",
        headers: {
            ...authHeaders()
        }
    }).catch();
    const data: Location[] = await response.json();
    data.unshift({
        locationId: 0,
        locationName: "Ninguna",
        locationLatLng: [0, 0],
        locationAddress: "No existe"
    });
    return (
        <div className="w-8/12">
            <div className="w-full flex flex-col items-center h-[90vh] bg-red-50 overflow-hidden overflow-y-auto">
                <div className="w-1/2 my-10">
                    <SelectLocation locations={data} store={searchParams?.store} />
                </div>
                <div className="w-8/12">
                    <LocationCard store={searchParams?.store}/>
                </div>
                {searchParams.store ? null : (
                    <div className="w-6/12 my-10">
                        <FormNewLocation />
                    </div>
                )}
                <div>
                    <DeleteLocationButton store={searchParams?.store} />
                </div>
                <UpdateLocation>
                    <FormUpdateLocation store={searchParams?.store} />
                </UpdateLocation>
            </div>
        </div>
    );
}