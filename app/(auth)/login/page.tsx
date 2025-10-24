'use client';
import login from "@/helpers/login";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const router = useRouter();
    const handleLogin = async (e: any) => {
        setSubmitting(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const authData = {
            userEmail: formData.get("userEmail") as string,
            userPassword: formData.get("userPassword") as string
        };
        const statusCode = await login(authData)
            .finally(() => setSubmitting(false));

        if (statusCode === 500)
            alert("Ocurrió un error");
        else if (statusCode === 201)
            router.push("/dashboard");
        setErrorCode(statusCode);
    };
    return (
        <form className="bg-orange-500 px-10 py-2 rounded-md w-96" onSubmit={handleLogin}>
            <p className="text-2xl my-4 text-white">Iniciar sesión <span></span></p>
            <div className="flex flex-col gap-2 my-4">
                <Input isInvalid={errorCode == 404} name="userEmail" label="Email" type="email"
                    isRequired={true} size="sm" />
                <Input isInvalid={errorCode == 401 || errorCode == 404} name="userPassword"
                    label="Contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button color="primary" type="submit" disabled={submitting}>{
                    submitting
                        ? <Spinner size="md" />
                        : "Iniciar sesión"
                }</Button>
                <p className="text-white">
                    ¿No tienes una cuenta? { }
                    <Link href="./signup" className="text-red-600 underline">Regístrate</Link>
                </p>
            </div>
        </form>
    );
}