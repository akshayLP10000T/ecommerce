export interface User{
    _id: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
    contactNumber: number;
    city: string;
    address: string;
    storeOwner: boolean;
    appliedForStore: boolean;
}