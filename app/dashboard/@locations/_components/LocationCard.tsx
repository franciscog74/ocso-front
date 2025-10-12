import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return null;

    const { data } = await axios.get<Location>(`${API_URL}/locations/${store}`, {
        headers: {
            ...authHeaders()
        }
    });
    
    return (
        <Card>
            <CardHeader>
                <p className="w-full text-2xl"><b>{data.locationName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full"> Manager: <Link href={{pathname: `/dashboard/managers`}}>
                    <b>{data.manager?.managerFullName ?? "Ninguno"}</b>
                </Link></p>
                <p className="w-full"> Dirección: <b>{data.locationAddress}</b></p>
            </CardBody>
        </Card>
    );
}