import Image from "next/image";

export default function Header() {
    return (
        <div className="w-screen h-[10vh] bg-orange-200 flex flex-row items-center px-[3vw]">
            <Image
                src="/Oxxo_Logo.svg"
                alt="Logo de Ocso"
                priority
                width={0}
                height={0}
                style={{width: "6vw"}}
                draggable={false}
            />
        </div>
    );
}