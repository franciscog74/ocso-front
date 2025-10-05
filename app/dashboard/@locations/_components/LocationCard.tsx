import { API_URL, TOKEN_NAME } from "@/constants";
import { Location } from "@/entities";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function LocationCard({ store } : { store : string | string[] | undefined }) {
    const token = cookies().get(TOKEN_NAME)?.value;
        if (!store)
            return null;
        const { data: location } = await axios.get<Location>(`${API_URL}/locations/${store}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return (
        <Card>
            <CardHeader>
                <p className="w-full"><b>{location.locationName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full"> Dirección: <b>{location.locationAddress}</b></p>
                <p className="w-full"> Manager: <Link href={{pathname: "/dashboard/managers"}}>
                    <b>{location.manager?.managerFullName ?? "Ninguno"}</b>
                </Link></p>
            </CardBody>
        </Card>
    );
}