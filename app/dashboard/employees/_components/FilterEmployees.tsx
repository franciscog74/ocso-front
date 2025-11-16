'use client';
import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function FilterEmployees({ employees, locations }: {
    employees: JSX.Element[],
    locations: Location[]
}) {
    const [filter, setFilter] = useState(0);

    return (
        <>
            <div className="px-5">
                <Select
                    onChange={(e) => {
                        setFilter(+(e.target.value ?? 0));
                    }}
                    label="Tienda"
                >
                    {locations.map((location) => {
                        return (
                            <SelectItem key={location.locationId.toString()} value={location.locationId}>
                                {location.locationName}
                            </SelectItem>
                        );
                    })}
                </Select>
            </div>
            <div className="flex flex-row flex-wrap overflow-hidden overflow-y-auto">
                {filter ?
                    employees.filter(employee => {
                        // @ts-ignore
                        const key = +(employee["_payload"].value.props.rel);
                        return key === filter;
                    }) : employees}
            </div>
        </>
    );
}