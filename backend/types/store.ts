import mongoose, { Document } from 'mongoose';

interface StoreType{
    owner: mongoose.Schema.Types.ObjectId;
    items: mongoose.Schema.Types.ObjectId[];
    orders: mongoose.Schema.Types.ObjectId[];
    name: string;
    description: string;
}

export interface StoreTypeDocument extends StoreType, Document{
    createdAt: Date;
    updatedAt: Date;
}