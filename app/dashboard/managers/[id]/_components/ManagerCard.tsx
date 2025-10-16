import { Manager, Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function ManagerCard({ manager }: { manager: Manager }) {
    return (
        <Card className="mx-20 py-2">
            <CardHeader>
                <p className="w-full text-4xl text-center"><b>{manager.managerFullName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody className=" text-lg">
                <p className="w-full">Emial: <b>{manager.managerEmail}</b></p>
                <p className="w-full">Teléfono: <b>{manager.managerPhone}</b></p>
                <p className="w-full">Salario: <b>${manager.managerSalary}</b></p>
                <p className="w-full">Tienda: {}
                    {manager.location ?
                    <Link href={{ pathname: "/dashboard", query: { store: manager.location.locationId } }}>
                        <b>{manager.location.locationName}</b>
                    </Link>
                    : "Ninguna"
                    }
                </p>
            </CardBody>
        </Card>
    );
}