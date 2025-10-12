import { API_URL } from "@/constants";
import axios from "axios";
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { authHeaders } from "@/helpers/authHeaders";

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { data } = await axios.get<Location[]>(`${API_URL}/locations`, {
        headers: {
            ...authHeaders()
        }
    }).catch();
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
            </div>
        </div>
    );
}