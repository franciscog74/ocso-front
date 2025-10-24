'use client';
import { API_URL } from "@/constants";
import login from "@/helpers/login";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSignup = async (e: any) => {
        setSubmitting(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const userPassword = password;
        const userData = {
            userEmail: formData.get("userEmail") as string,
            userPassword
        };
        const signupStatus = await fetch(`${API_URL}/auth/signup`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userData),
            credentials: "include"
        })
            .catch(() => ({ status: 500 }))
            .then((response) => {
                return response.status;
            })
            .finally(() => setSubmitting(false));

        if (signupStatus === 201) {
            const loginStatus = await login(userData)
                .catch(() => 500);
            if (loginStatus === 500)
                alert("Ocurrió un error");
            else if (loginStatus === 201)
                router.push("/dashboard/products");
        }
    };
    return (
        <form className="bg-orange-500 px-10 py-2 rounded-md w-96" method="POST" onSubmit={handleSignup}>
            <p className="text-2xl my-4 text-white">Registrarse</p>
            <div className="flex flex-col gap-2 my-4">
                <Input name="userEmail" label="Email" type="email" isRequired={true} size="sm" />
                <Input label="Contraseña" value={password} onValueChange={setPassword}
                    type="password" isRequired={true} size="sm" />
                <Input
                    validate={(value) => {
                        if (!value || value === password)
                            return null;
                        else
                            return "La contraseña debe ser la misma";
                    }}
                    label="Repetir contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button color="primary" type="submit" disabled={submitting}>
                    {submitting ?
                        <Spinner size="md" /> :
                        "Registrarse"
                    }
                </Button>
                <p className="text-white">
                    ¿Ya tienes una cuenta? { }
                    <Link href="./login" className="text-red-600 underline">Inicia sesión</Link>
                </p>
            </div>
        </form>
    );
}