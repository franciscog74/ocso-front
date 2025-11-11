import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

export default async function EmployeePhotoCard({ employee }: { employee: Employee }) {
    const response = await fetch(`${API_URL}/employees/${employee.employeeId}/photo`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:employees", `dashboard:employees:${employee.employeeId}`]
        }
    });

    const cardFooter = (
        <CardFooter className="absolute bottom-0 py-2 h-14">
            <Link href={`/dashboard/employees/${employee.employeeId}`}>
                <Button variant="ghost">Actualizar datos</Button>
            </Link>
        </CardFooter>
    );

    if (response.status !== 200) {
        return (
            <Card className="m-5 max-h-72 min-w-72">
                <CardHeader>
                    <h1 className="font-bold text-xl">
                        {employee.employeeName} {employee.employeeLastName}
                    </h1>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="w-full">Emial: <b>{employee.employeeEmail}</b></p>
                    <p className="w-full">Teléfono: <b>{employee.employeePhone}</b></p>
                </CardBody>
                {cardFooter}
            </Card>
        );
    }

    const type = response.headers.get("content-type")
    const imageSrc = `data:${type};base64,` + Buffer.from(await response.bytes()).toString("base64");
    return (
        <Card className="m-5 max-h-72 max-w-72" isFooterBlurred>
            <CardHeader className="absolute top-0 bg-black bg-opacity-25 z-10">
                <h1 className="font-bold text-xl text-white drop-shadow-sm">
                    {employee.employeeName} {employee.employeeLastName}
                </h1>
            </CardHeader>
            <Divider />
            <Image src={imageSrc} className="z-0" classNames={{ img: "size-72" }} />
            {cardFooter}
        </Card>
    );
}