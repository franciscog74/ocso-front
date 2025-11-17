import deleteEmployee from "@/actions/employees/delete";
import { Button } from "@nextui-org/react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteEmployeeButton({ employeeId }: { employeeId: string }) {
    const deleteWithEmployeeId = deleteEmployee.bind(null, employeeId);
     return (
        <form action={deleteWithEmployeeId}>
            <Button type="submit" color="danger" className="self-center">
                <LuTrash2 size={20} />
            </Button>
        </form>
    );
}