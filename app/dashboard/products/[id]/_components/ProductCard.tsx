import { Product } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="mx-10 my-5 py-2 overflow-visible hover:scale-105 transition-all">
            <CardHeader>
                <p className="w-full text-xl text-center px-4"><b>{product.productName}</b></p>
            </CardHeader>
            <Divider />
            <CardBody className=" text-lg">
                <p className="w-full">Precio: <b>${product.price}</b></p>
                <p className="w-full">Sellos: <b>{product.sealCount}</b></p>
                <p className="w-full">Proveedor: <b>{product.provider ?
                    <Link className="font-bold underline"
                        href={`/dashboard/providers/${product.provider.providerID}`}
                    >
                        {product.provider.providerName}
                    </Link> :
                    "Ninguno"}</b></p>
            </CardBody>
        </Card>
    );
}