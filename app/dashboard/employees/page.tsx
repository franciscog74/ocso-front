import { API_URL } from "@/constants";
import { Employee, Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import NewEmployee from "./_components/NewEmployee";
import FormNewEmployee from "./_components/FormNewEmployee";
import FilterEmployees from "./_components/FilterEmployees";
import EmployeePhotoCard from "./_components/EmployeePhotoCard";

export default async function EmployeesPage() {
    const employeeResponse = await fetch(`${API_URL}/employees`, {
        method: "GET",
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:employees"]
        }
    });
    const employees: Employee[] = await employeeResponse.json();

    const response = await fetch(`${API_URL}/locations`, {
        method: "GET",
        headers: {
            ...authHeaders()
        }
    }).catch();
    const locations: Location[] = await response.json();

    return (
        <div className="flex flex-col w-11/12 p-5 h-[90vh]">
            <FilterEmployees
                employees={employees.map(employee => (
                    <EmployeePhotoCard employee={employee} key={employee.employeeId} />
                ))}
                locations={locations} />
            <div className="absolute bottom-10 right-10">
                <NewEmployee>
                    <FormNewEmployee />
                </NewEmployee>
            </div>
        </div>
    );
}