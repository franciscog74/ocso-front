"use client";
import deleteProvider from "@/actions/providers/delete";
import { Button } from "@nextui-org/react";

export default function DeleteProviderButton({ providerId }: { providerId: string }) {
    const deleteWithProviderId = deleteProvider.bind(null, providerId);
    return (
        <Button className="w-full my-4" onPress={deleteWithProviderId} color="danger">
            Estoy seguro
        </Button>
    );
}