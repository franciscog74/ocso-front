import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeePhotoCard from "./[id]/_components/EmployeePhotoCard";

export default async function EmployeesPage() {
    const response = await fetch(`${API_URL}/employees`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:employees"]
        }
    });
    const employees: Employee[] = await response.json();
    return (
        <div className="flex flex-row w-11/12 p-5 h-[90vh] overflow-hidden overflow-y-auto">
            {employees.map(employee => (
                <EmployeePhotoCard employee={employee} key={employee.employeeId} />
            ))}
        </div>
    );
}