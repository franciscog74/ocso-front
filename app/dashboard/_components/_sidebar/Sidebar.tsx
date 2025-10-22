import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
    return (
        <nav className="w-1/12 h-[90vh] bg-orange-200 flex flex-col items-center justify-center gap-[4vh]">
            <NavItem icon={<LuStore size="6vh" />} path ="/dashboard" />
            <NavItem icon={<LuTruck size="6vh" />} path ="/dashboard/providers" />
            <NavItem icon={<LuWheat size="6vh" />} path ="/dashboard/products" />
            <NavItem icon={<LuUser size="6vh" />} path ="/dashboard/managers" />
            <NavItem icon={<LuUsers size="6vh" />} path ="/dashboard/employees" />
        </nav>
    );
}