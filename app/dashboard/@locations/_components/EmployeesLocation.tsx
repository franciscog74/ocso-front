import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return null;
    const response = await fetch(`${API_URL}/employees/location/${store}`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations:employees"]
        }
    });
    const data: Employee[] = await response.json();
    if (response.status === 404 || !data)
        return null;
    return data.map((employee) => {
        return (
            <Card className="mx-10 my-10">
                <CardHeader>
                    <p className="w-full">Nombre: <b>{employee.employeeName}
                        {} {employee.employeeLastName}</b></p>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="w-full">Emial: <b>{employee.employeeEmail}</b></p>
                    <p className="w-full">Teléfono: <b>{employee.employeePhone}</b></p>
                </CardBody>
            </Card>
        )
    });

}