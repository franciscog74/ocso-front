import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function ManagerPage({
    params
}: {
    params: {
        id: string;
    }
}) {
    const response = await fetch(`${API_URL}/managers/${params.id}`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:managers", `dashboard:managers:${params.id}`]
        }
    });
    const manager: Manager = await response.json();
    return (
        <Card className="mx-20 py-2 bg-orange-50">
            <CardHeader>
                <p className="w-full">Nombre: <b>{manager.managerFullName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">Emial: <b>{manager.managerEmail}</b></p>
                <p className="w-full">Teléfono: <b>{manager.managerPhone}</b></p>
                <p className="w-full">Salario: <b>${manager.managerSalary}</b></p>
                <p className="w-full">Tienda: {}
                    <Link href={{ pathname: `/dashboard/location?store=${manager.managerId}` }}>
                        <b>{manager.location?.locationName ?? "Ninguna"}</b>
                    </Link>
                </p>
            </CardBody>
        </Card>
    );
}