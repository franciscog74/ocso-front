'use client';

import registerEmployee from "@/actions/users/employee";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { generate } from "generate-password";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function FormCreateUser({ employee }: { employee: Employee }) {
    const registerWithEmployeeId = registerEmployee.bind(null, employee.employeeId);
    const [password, setPassword] = useState<string>();
    const [visible, setVisible] = useState(false);

    return (
        <form className="bg-orange-400 px-10 py-6 rounded-md w-96 flex flex-col items-center"
            action={registerWithEmployeeId}
        >
            <div className="flex flex-col gap-2 my-4 w-full">
                <Input name="userEmail" label="Email" type="email" isRequired
                    defaultValue={employee.employeeEmail} size="sm"
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
                <Button color="danger" type="button" onPress={() => setPassword(generate({ length: 10, numbers: true }))}>
                    Generar contraseña
                </Button>
                <Button color="primary" type="submit">
                    Registrarse
                </Button>
            </div>
        </form>
    );
}