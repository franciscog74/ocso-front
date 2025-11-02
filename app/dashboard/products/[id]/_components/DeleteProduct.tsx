'use client';
import { deleteProduct } from "@/actions/products/delete";
import { Button } from "@nextui-org/react";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteProduct({ productID }: { productID: string }) {
    const deleteWithProductID = deleteProduct.bind(null, productID);
    return (
        <form action={deleteWithProductID} className="grid justify-items-center">
            <Button color="danger" type="submit" className="w-3/12">
                <LuTrash2 size={20} />
            </Button>
        </form>
    );
}