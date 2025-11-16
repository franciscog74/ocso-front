import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";
import EmployeeDataCard from "./_components/EmployeeDataCard";

export default async function EmployeePage({ params: { id } }: { params: { id: string } }) {
    const response = await fetch(`${API_URL}/employees/${id}`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:employees", `dashboard:employees:${id}`]
        }
    });
    const employee: Employee = await response.json();
    return (
        <div className="w-11/12 h-[90vh] flex flex-row py-8 items-center justify-center">
            <EmployeeDataCard employee={employee} />
            <FormUpdateEmployee employee={employee} />
        </div>
    );
}