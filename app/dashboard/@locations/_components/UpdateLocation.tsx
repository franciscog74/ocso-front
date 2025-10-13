'use client';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";
import { LuPencil } from "react-icons/lu";

export default function UpdateLocation({ children, store }: { children: ReactNode, store: string | string[] | undefined }) {
    if (typeof store !== "string")
        return (<></>);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary"><LuPencil size={20} /></Button>
            <Modal className="bg-orange-400" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-full">
                    {() => (
                        <>
                            <ModalBody>
                                {children}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}