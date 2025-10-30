import { Button, Input } from "@nextui-org/react";
import { Provider } from "@/entities";
import { createProduct } from "@/actions/products/create";
import { LuDollarSign } from "react-icons/lu";
import SelectProvider from "./SelectProvider";

export default async function FormNewProduct({ providers }: { providers: Provider[] }) {
    return (
        <form action={createProduct} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg max-w-[28rem]">
            <h1 className="text-3xl text-white text-center">Crear Producto</h1>
            <Input isRequired={true} label="Nombre" placeholder="Nuevo producto" name="productName" />
            <Input startContent={<LuDollarSign size={20} />} isRequired={true} label="Precio" placeholder="29.99" name="price" />
            <Input isRequired={true} label="No. de sellos" placeholder="2" name="sealCount" />
            <SelectProvider providers={providers} />
            <Button type="submit" color="primary">Subir</Button>
        </form>
    );
}