import { updateProduct } from "@/actions/products/update";
import { Product, Provider } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { LuDollarSign } from "react-icons/lu";
import SelectProvider from "../../_components/SelectProvider";

export default function FormUpdateProduct({ product, providers }: { product: Product, providers: Provider[] }) {
    const updateWithProductId = updateProduct.bind(null, product.productID);
    return (
        <form action={updateWithProductId} className="bg-orange-200 py-4 mx-10 px-10 flex flex-col gap-4 w-auto rounded-lg">
            <h1 className="text-center text-2xl">Modificar datos</h1>
            <Input isRequired={true} label="Nombre" defaultValue={product.productName} name="productName" />
            <Input startContent={<LuDollarSign size={20} />} isRequired={true} label="Precio" defaultValue={product.price.toString()} name="price" />
            <Input isRequired={true} label="No. de sellos" defaultValue={product.sealCount.toString()} name="sealCount" />
            <SelectProvider providers={providers} defaultProvider={product.provider?.providerID} />
            <Button type="submit" color="primary">Actualizar</Button>
        </form>
    );
}