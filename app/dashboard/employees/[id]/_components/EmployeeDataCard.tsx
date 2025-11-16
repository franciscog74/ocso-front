import { Employee } from "@/entities";
import { Image } from "@nextui-org/react";
import getImage from "@/helpers/getImage";
import Link from "next/link";


export default async function EmployeeDataCard({ employee }: { employee: Employee }) {
    const imageSrc = await getImage(employee.employeeId);
    return (
        <div className="flex flex-row gap-2 bg-white rounded-lg flex-grow-0 h-fit items-center
                px-4 py-4 mx-10 border-2 border-orange-400"
        >
            <div className="text-xl w-fit py-4">
                <h1 className="font-bold">
                    {employee.employeeName} {employee.employeeLastName}
                </h1>
                <h1>{employee.employeeEmail}</h1>
                <h1>{employee.employeePhone}</h1>
                <h1>Ubicación: {employee.location?.locationName ? (
                    <Link href={{
                        pathname: "/dashboard",
                        query: `store=${employee.location.locationId}`
                    }} className="font-bold underline">
                        {employee.location.locationName}
                    </Link>
                ) : "Ninguna"}</h1>
            </div>
            {imageSrc ? (
                <>
                    <div className="h-full py-20 w-1 bg-zinc-300 mx-6 rounded-sm" />
                    <Image src={imageSrc} isZoomed className="object-cover"
                        classNames={{ img: "size-60" }}
                    />
                </>
            ) : null}
        </div>
    );
}