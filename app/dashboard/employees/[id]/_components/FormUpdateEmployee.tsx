import updateEmployee from "@/actions/employees/update";
import { Employee, Location } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import SelectStore from "../../_components/SelectStore";
import { authHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";

export default async function FormUpdateEmployee({ employee }: { employee: Employee }) {
    const response = await fetch(`${API_URL}/locations`, {
            method: "GET",
            headers: {
                ...authHeaders()
            }
        }).catch();
        const data: Location[] = await response.json();
    const updateWithEmployeeId = updateEmployee.bind(null, employee.employeeId);
    return (
        <form action={updateWithEmployeeId} className="flex flex-col gap-2 p-4 m-2 bg-orange-300
            h-fit rounded-lg"
        >
            <Input isRequired name="employeeName" defaultValue={employee.employeeName}
                label="Nombre"
            />
            <Input isRequired name="employeeLastName" defaultValue={employee.employeeLastName}
                label="Apellidos"
            />
            <Input isRequired name="employeePhone" defaultValue={employee.employeePhone}
                label="Teléfono"
            />
            <Input isRequired name="employeeEmail" defaultValue={employee.employeeEmail}
                label="Email"
            />
            <Input name="employeePhoto" type="file" label="Foto" accept="image/png,image/jpeg" />
            <SelectStore locations={data} defaultStore={employee.location?.locationId} />
            <Button type="submit" color="primary">
                Actualizar datos
            </Button>
        </form>
    );
}