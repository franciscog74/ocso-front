import { Employee } from "@/entities";
import getImage from "@/helpers/getImage";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

export default async function EmployeePhotoCard({ employee }: { employee: Employee }) {
    const imageSrc = await getImage(employee.employeeId);

    const cardFooter = (
        <CardFooter className="absolute bottom-0 py-2 h-14">
            <Link href={`/dashboard/employees/${employee.employeeId}`}>
                <Button variant="ghost">Actualizar datos</Button>
            </Link>
        </CardFooter>
    );

    if (!imageSrc) {
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

    return (
        <Card className="m-5 max-h-72 max-w-72" isFooterBlurred>
            <CardHeader className="absolute top-0 bg-black bg-opacity-25 z-10">
                <h1 className="font-bold text-xl text-white drop-shadow-sm">
                    {employee.employeeName} {employee.employeeLastName}
                </h1>
            </CardHeader>
            <Image src={imageSrc} className="z-0 object-cover" classNames={{ img: "size-72" }} />
            {cardFooter}
        </Card>
    );
}