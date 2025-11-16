import createEmployee from "@/actions/employees/create";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default async function FormNewEmployee() {
    return (
        <form action={createEmployee} className="flex flex-col gap-2 p-4 m-2 bg-orange-300
            h-fit rounded-lg"
        >
            <Input isRequired name="employeeName" placeholder="Marco" label="Nombre" />
            <Input isRequired name="employeeLastName" placeholder="Aurelio" label="Apellidos" />
            <Input isRequired name="employeePhone" placeholder="0123456789" label="Teléfono" />
            <Input isRequired name="employeeEmail" placeholder="marco@correo.com" label="Email" />
            <Input name="employeePhoto" type="file" label="Foto" accept="image/png,image/jpeg" />
            <Button type="submit" color="primary">
                Subir
            </Button>
        </form>
    );
}