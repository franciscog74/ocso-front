import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return null;

    const response = await fetch(`${API_URL}/locations/${store}`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations", `dashboard:locations:${store}`]
        }
    });
    const data: Location = await response.json();
    
    return (
        <Card>
            <CardHeader>
                <p className="w-full text-2xl"><b>{data.locationName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">
                    Manager: {}
                    <Link className="underline" href={{ pathname: `/dashboard/managers/${data.manager?.managerId}` }}>
                        <b>{data.manager?.managerFullName ?? "Ninguno"}</b>
                    </Link>
                </p>
                <p className="w-full"> Dirección: <b>{data.locationAddress}</b></p>
            </CardBody>
        </Card>
    );
}