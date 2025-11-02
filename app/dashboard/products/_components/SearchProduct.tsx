'use client';
import { Product, Provider } from "@/entities";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../[id]/_components/ProductCard";
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function SearchProduct({
    products,
    providers
}: {
    products: Product[],
    providers: Provider[]
}) {
    const [filter, setFilter] = useState("");
    const [providerID, setProviderID] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    useEffect(() => {
        let tempFiltered = products;

        if (filter)
            tempFiltered = tempFiltered.filter(product =>
                product.productName.toLowerCase().includes(filter.toLowerCase())
            );

        if (providerID)
            tempFiltered = tempFiltered.filter(product =>
                product.provider?.providerID === providerID
            );

        setFilteredProducts(tempFiltered);
    }, [filter, providerID, products]);

    return (
        <div className="h-[90vh] w-4/12">
            <div className="h-[28vh] pt-8 pb-4 w-auto px-10 overflow-hidden overflow-y-auto">
                <Input
                    label="Buscar productos"
                    onChange={e => setFilter(e.target.value ?? "")}
                    className="pb-6"
                />
                <Select
                    label="Filtrar por proveedor"
                    selectedKeys={[providerID]}
                    onChange={e => setProviderID(e.target.value ?? "")}
                >
                    {providers.map(provider => (
                        <SelectItem key={provider.providerID} value={provider.providerID}>
                            {provider.providerName}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="h-[62vh] w-full py-2 overflow-hidden overflow-y-auto gap-6">
                {filteredProducts.map(product => (
                    <Link
                        className="size-fit"
                        key={product.productID}
                        href={{ pathname: `/dashboard/products/${product.productID}` }}>
                        <ProductCard product={product} key={product.productID} />
                    </Link>
                ))}
            </div>
        </div>
    );
}