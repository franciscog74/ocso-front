import ManagerCards from "./_components/ManagerCards";

export default function ManagersLayout({
    children,
    count
}: {
    children: React.ReactNode,
    count: React.ReactNode
}) {
    return (
        <>
            <div className="w-4/12 h-[90vh] overflow-hidden overflow-y-auto">
                <ManagerCards />
            </div>
            <div className="w-7/12 flex flex-col items-center gap-10 h-[90vh] overflow-hidden overflow-y-auto">
                <div className="w-full mt-10">{children}</div>
                <div className="mb-10">{count}</div>
            </div>
        </>
    );
}