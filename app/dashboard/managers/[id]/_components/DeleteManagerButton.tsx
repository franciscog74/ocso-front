import deleteManager from "@/actions/managers/delete";
import { Button } from "@nextui-org/react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteManagerButton({ managerId }: { managerId: string }) {
    const deleteWithManagerId = deleteManager.bind(null, managerId);
    return (
        <form action={deleteWithManagerId} className="my-4">
            <Button type="submit" color="danger">
                <LuTrash2 size={20} />
            </Button>
        </form>
    );
}