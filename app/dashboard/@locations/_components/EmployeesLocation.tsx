import { API_URL, TOKEN_NAME } from "@/constants";
import { Employee } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
    const token = cookies().get(TOKEN_NAME)?.value;
    if (!store)
        return null;
    const { data } = await axios.get<Employee[]>(`${API_URL}/employees/location/${store}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!data)
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