import ManagerCards from "./_components/ManagerCards";

export default function ManagersLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-4/12 h-[90vh] overflow-hidden overflow-y-auto">
                <ManagerCards />
            </div>
            <div className="w-7/12">
                {children}
            </div>
        </>
    );
}