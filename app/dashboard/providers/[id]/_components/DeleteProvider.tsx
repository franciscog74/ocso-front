'use client';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteProvider({
    children,
    providerName
}: {
    children: ReactNode,
    providerName: string
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className="self-center w-3/12 mt-10 mb-5" onPress={onOpen} color="danger">
                <LuTrash2 size={20} />
            </Button>
            <Modal className="bg-orange-400" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-full">
                    {() => (
                        <>
                            <ModalBody>
                                <b className="text-2xl px-5 mt-6 text-center">
                                    ¿Está seguro de eliminar el proveedor {providerName}?
                                </b>
                                <div>
                                    <Button className="w-full my-2" onPress={onOpenChange}>
                                        Cancelar
                                    </Button>
                                    {children}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}