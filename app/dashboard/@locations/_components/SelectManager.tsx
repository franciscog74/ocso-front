'use client';
import { Location, Manager } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectManager({ managers, locations }: {
    managers: Manager[],
    locations: Location[]
}) {
    const disabledKeys = locations.map((location: Location) =>
        location.manager?.managerId
    ).filter((managerKey) =>
        managerKey !== undefined
    );
    return (
        <Select name="manager" label="Manager" disabledKeys={disabledKeys}>
            {managers.map((manager) => {
                return (
                    <SelectItem key={manager.managerId} value={manager.managerId}>
                        {manager.managerFullName}
                    </SelectItem>
                );
            })}
        </Select>
    );
}