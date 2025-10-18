import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ManagerCard from "./_components/ManagerCard";
import DeleteManagerButton from "./_components/DeleteManagerButton";
import UpdateManager from "./_components/UpdateManager";
import FormUpdateManager from "./_components/FormUpdateManager";

export default async function ManagerPage({
    params: {
        id
    }
}: {
    params: {
        id: string;
    }
}) {
    const response = await fetch(`${API_URL}/managers/${id}`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:managers", `dashboard:managers:${id}`]
        }
    });
    const manager: Manager = await response.json();
    return (
        <div className="flex flex-col gap-10 flex-grow-0">
            <ManagerCard manager={manager} />
            <div className="flex flex-row flex-grow-0 gap-10 items-center justify-center">
                    <UpdateManager>
                        <FormUpdateManager manager={manager} />
                    </UpdateManager>
                    <DeleteManagerButton managerId={id} />
                </div>
        </div>
    );
}