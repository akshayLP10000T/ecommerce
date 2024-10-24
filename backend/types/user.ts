import mongoose, { Document } from "mongoose";

interface UserType{
    fullName: string;
    email: string;
    password: string;
    age: number;
    contactNumber: number;
    address: string | null;
    city: string | null;
    country: string | null;
    storeOwner: boolean;
    appliedForStore: boolean | undefined;
    admin: boolean;
    store: mongoose.Schema.Types.ObjectId;
}

export interface UserTypeDocument extends UserType, Document {
    createdAt: Date;
    updatedAt: Date;
}