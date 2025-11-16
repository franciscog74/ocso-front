import deleteEmployee from "@/actions/employees/delete";
import { Button } from "@nextui-org/react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteEmployeeButton({ employeeId }: { employeeId: string }) {
    const deleteWithEmployeeId = deleteEmployee.bind(null, employeeId);
     return (
        <form action={deleteWithEmployeeId} className="relative flex flex-col bottom-[-1.5rem] my-4">
            <Button type="submit" color="danger" className="self-center">
                <LuTrash2 size={20} />
            </Button>
        </form>
    );
}