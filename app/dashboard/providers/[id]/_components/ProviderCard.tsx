import { Provider } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <Card className="mx-10 my-5 py-2">
            <CardHeader>
                <p className="w-full text-4xl text-center"><b>{provider.providerName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody className=" text-lg">
                <p className="w-full">Emial: <b>{provider.providerEmail}</b></p>
                <p className="w-full">Teléfono: <b>{provider.providerPhone ?? "Ninguno"}</b></p>
                <p className="w-full">Productos: <b>{
                    provider.products?.length ?? 0
                    }</b></p>
            </CardBody>
        </Card>
    );
}