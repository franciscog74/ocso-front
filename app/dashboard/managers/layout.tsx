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
            <div className="w-7/12 flex flex-col justify-center items-center gap-10">
                <div className="w-full">{children}</div>
                <div className="">{count}</div>
            </div>
        </>
    );
}