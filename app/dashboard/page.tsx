import EmployeesLocation from "./@locations/_components/EmployeesLocation";

export default function DashboardPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <div className="h-full w-3/12 bg-red-100">
            <div className="h-[90vh] overflow-hidden overflow-y-auto">
                {searchParams.store ? (
                    <EmployeesLocation store={(searchParams)?.store} />
                ) : (
                    <p className="w-full text-2xl px-2 text-center">Selecciona una tienda para ver los empleados</p>
                )}
            </div>
        </div>
    );
}