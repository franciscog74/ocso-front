import updateEmployee from "@/actions/employees/update";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default async function FormUpdateEmployee({ employee }: { employee: Employee }) {
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
            <Button type="submit" color="primary">
                Actualizar datos
            </Button>
        </form>
    );
}