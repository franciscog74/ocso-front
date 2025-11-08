import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "../@locations/_components/EmployeeCard";

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
        <div className="w-4/12 h-[90vh]">
            {employees.map(employee => (
                <EmployeeCard employee={employee} key={employee.employeeId} />
            ))}
        </div>
    );
}