'use client';
import { Product } from "@/entities";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../[id]/_components/ProductCard";
import { Input } from "@nextui-org/react";

export default function SearchProduct({ products }: { products: Product[] }) {
    const [filter, setFilter] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    useEffect(() => {
        if (filter)
            setFilteredProducts(products.filter(product =>
                product.productName.toLowerCase().includes(filter.toLowerCase())
            ));
        else
            setFilteredProducts(products);
    }, [filter]);

    const inputChange = (e: any) => {
        setFilter(e.target.value);
    };

    return (
        <div className="h-[90vh] w-4/12 px-0 py-6 overflow-hidden">
            <div className="pb-4 w-auto mx-10">
                <Input label="Buscar productos" onChange={inputChange} />
            </div>
            <div className="h-full w-full py-2 overflow-hidden overflow-y-auto gap-6">
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