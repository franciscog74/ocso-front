'use client';

import registerManager from "@/actions/users/manager";
import { Manager } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { generate } from "generate-password";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function FormCreateUser({ manager }: { manager: Manager }) {
    const registerWithManagerId = registerManager.bind(null, manager.managerId);
    const [password, setPassword] = useState<string>();
    const [visible, setVisible] = useState(false);

    return (
        <form className="bg-orange-400 px-10 py-6 rounded-md w-96 flex flex-col items-center"
            action={registerWithManagerId}
        >
            <h1 className="text-white text-xl font-bold text-center">Crear usuario</h1>
            <div className="flex flex-col gap-2 my-4 w-full">
                <Input name="userEmail" label="Email" type="email" isRequired
                    defaultValue={manager.managerEmail} size="sm"
                />
                <Input name="userPassword" label="Contraseña"
                    type={visible ? "text" : "password"} isRequired={true}
                    value={password} onValueChange={setPassword} size="sm" endContent={
                        <button type="button"
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? <LuEyeOff /> : <LuEye />}
                        </button>
                    }
                />
                <Button color="danger" type="button" onPress={() => setPassword(generate({
                    length: 10,
                    numbers: true
                }))}>
                    Generar contraseña
                </Button>
                <Button color="primary" type="submit">
                    Registrarse
                </Button>
            </div>
        </form>
    );
}