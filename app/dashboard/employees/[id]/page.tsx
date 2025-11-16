import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "../../@locations/_components/EmployeeCard";
import { Image } from "@nextui-org/react";
import getImage from "@/helpers/getImage";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";

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
    const imageSrc = await getImage(id);
    return (
        <div className="w-full h-[90vh] flex flex-row">
            <div>
                <EmployeeCard employee={employee} />
                {imageSrc ? (
                    <div className="mx-10">
                        <Image src={imageSrc} isZoomed className="object-cover"
                            classNames={{ img: "size-60" }}
                        />
                    </div>
                ) : null}
            </div>
            <FormUpdateEmployee employee={employee} />
        </div>
    );
}