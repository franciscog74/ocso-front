export interface Location {
    locationId: number;
    locationName: string;
    locationAddress: string;
    locationLatLng: number[];
    manager?: Manager;
    regionId?: any;
    employees?: Employee[];
}

export interface Employee {
    employeeId: string;
    employeeName: string;
    employeeLastName: string;
    employeePhone: string;
    employeeEmail: string;
    employeePhoto: string;
    location?: Location;
    user?: any;
}

export interface Manager {
    managerId: string;
    managerFullName: string;
    managerSalary: number;
    managerEmail: string;
    managerPhone: string;
    location?: Location;
    user: any;
}