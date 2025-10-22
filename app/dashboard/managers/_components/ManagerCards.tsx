import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function ManagerCards() {
    const response = await fetch(`${API_URL}/managers`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const managers: Manager[] = await response.json();

    return managers.map((manager) => (
        <Link href={{pathname: `/dashboard/managers/${manager.managerId}`}}>
            <Card className="mx-10 my-10 hover:scale-105 transition-transform hover:bg-blue-50">
                <CardHeader>
                    <p className="w-full">Nombre: <b>{manager.managerFullName}</b></p>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="w-full">Emial: <b>{manager.managerEmail}</b></p>
                    <p className="w-full">Teléfono: <b>{manager.managerPhone}</b></p>
                    <p className="w-full">Salario: <b>${manager.managerSalary}</b></p>
                </CardBody>
            </Card>
        </Link>
    ));
}