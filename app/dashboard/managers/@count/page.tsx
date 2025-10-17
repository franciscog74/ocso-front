import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody } from "@nextui-org/react";

export default async function CountManagersPage() {
    const response = await fetch(`${API_URL}/managers`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const managers: Manager[] = await response.json();
    const count = managers.length;
    const managersWithoutStore = managers.filter(manager => !manager.location).length;
    let maxSalary = 0;
    let avgSalary = 0;
    managers.forEach(({ managerSalary }) => {
        if (managerSalary > maxSalary) maxSalary = managerSalary;
        avgSalary += managerSalary;
    });
    avgSalary /= count;

    return (
        <Card className="font-bold w-fit px-2 py-4">
            <CardBody className="text-center">
                <h1>Hay {count} manager{count > 1 ? "s" : ""}</h1>
                <h1>Hay {managersWithoutStore} manager{managersWithoutStore > 1 ? "s" : ""} sin tienda</h1>
                <h1>El salario máximo es de ${maxSalary}</h1>
                <h1>El salario promedio es de ${avgSalary}</h1>
            </CardBody>
        </Card>
    );
}