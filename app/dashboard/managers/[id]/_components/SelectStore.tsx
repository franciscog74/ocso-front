'use client';
import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectStore({ locations, defaultStore }: {
    locations: Location[],
    defaultStore?: number
}) {
    const disabledKeys = locations.map((location) =>
        (location.manager || location.locationId !== defaultStore)
            ? location.locationId
            : undefined
    ).filter((storeKey) =>
        storeKey !== undefined
    );
    return (
        <Select
            defaultSelectedKeys={(defaultStore === undefined) ? [] : [defaultStore]}
            name="location"
            label="Tienda"
            disabledKeys={disabledKeys}>
            {locations.map((location) => {
                return (
                    <SelectItem key={location.locationId} value={location.locationId}>
                        {location.locationName}
                    </SelectItem>
                );
            })}
        </Select>
    );
}