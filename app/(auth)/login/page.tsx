import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-orange-500 px-10 py-2 rounded-md w-96">
            <p className="text-2xl my-4 text-white">Iniciar sesión <span></span></p>
            <div className="flex flex-col gap-2 my-4">
                <Input label="Email" type="email" isRequired={true} size="sm" />
                <Input label="Contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button color="primary">Iniciar sesión</Button>
                <p className="text-white">
                    ¿No tienes una cuenta?
                    <Link href="./signup" className="text-red-600 underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );
}