import { Employee } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function EmployeeCard({ employee }: { employee: Employee }) {
    return (
        <Card className="mx-10 my-10">
            <CardHeader>
                <p className="w-full">Nombre: <b>{employee.employeeName}
                    { } {employee.employeeLastName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">Emial: <b>{employee.employeeEmail}</b></p>
                <p className="w-full">Teléfono: <b>{employee.employeePhone}</b></p>
            </CardBody>
        </Card>
    );
}