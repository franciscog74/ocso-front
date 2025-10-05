'use client';
import { API_URL } from "@/constants";
import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent) => {
        setSubmitting(true);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const authData = {
            userEmail: formData.get("userEmail"),
            userPassword: formData.get("userPassword")
        };
        const response = await axios.post(`${API_URL}/auth/login`, authData, {
            withCredentials: true
        })
            .then((response) => {
                if (response.status === 201)
                    router.push("/dashboard");
            })
            .catch()
            .finally(() => setSubmitting(false));
    };
    return (
        <form className="bg-orange-500 px-10 py-2 rounded-md w-96" onSubmit={handleLogin}>
            <p className="text-2xl my-4 text-white">Iniciar sesión <span></span></p>
            <div className="flex flex-col gap-2 my-4">
                <Input name="userEmail" label="Email" type="email" isRequired={true} size="sm" />
                <Input name="userPassword" label="Contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button color="primary" type="submit" disabled={submitting}>{
                    submitting
                        ? <Spinner size="md" />
                        : "Iniciar sesión"
                }</Button>
                <p className="text-white">
                    ¿No tienes una cuenta?
                    <Link href="./signup" className="text-red-600 underline">Regístrate</Link>
                </p>
            </div>
        </form>
    );
}