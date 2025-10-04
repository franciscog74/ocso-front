'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
    icon: JSX.Element;
    path: string;
}

export default function NavItem({ icon, path }: NavItemProps) {
    const currPath = usePathname();
    return (
        <Link href={path} className="w-full flex justify-center">
            <span className={
                path === currPath
                ? "bg-orange-400 w-10/12 flex justify-center rounded-md transition-all py-2"
                : "w-10/12 flex justify-center py-2 transition-all"}>
                    {icon}
                </span>
        </Link>
    );
}