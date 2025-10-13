'use client';
import { Location, Manager } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

interface SelectManagerProps {
    managers: Manager[],
    locations: Location[],
    defaultManager?: string
}

export default function SelectManager({ managers, locations, defaultManager }: SelectManagerProps) {
    const disabledKeys = locations.map((location: Location) =>
        location.manager?.managerId
    ).filter((managerKey) =>
        managerKey !== undefined
    );
    return (
        <Select defaultSelectedKeys={(defaultManager === undefined) ? [] : [defaultManager]}
            name="manager"
            label="Manager"
            disabledKeys={disabledKeys}>
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