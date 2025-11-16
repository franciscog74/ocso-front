'use client';
import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectStore({ locations, defaultStore }: {
    locations: Location[],
    defaultStore?: number
}) {
    return (
        <Select
            defaultSelectedKeys={(defaultStore === undefined) ? [] : [defaultStore.toString()]}
            name="location"
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
    );
}