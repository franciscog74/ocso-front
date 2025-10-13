import { deleteLocation } from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteLocationButton({ store }: { store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return null;

    return (
        <form action={deleteLocation} className="my-4">
            <Button type="submit" name="deleteValue" value={store} color="danger"><LuTrash2 size={20} /></Button>
        </form>
    );
}