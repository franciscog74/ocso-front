import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./EmployeeCard";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return null;
    const response = await fetch(`${API_URL}/employees/location/${store}`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations:employees"]
        }
    });
    const data: Employee[] = await response.json();
    if (response.status === 404 || !data)
        return null;
    return data.map((employee) => {
        return (
            <EmployeeCard employee={employee} key={employee.employeeId} />
        )
    });

}