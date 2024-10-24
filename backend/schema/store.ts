import mongoose, { mongo } from "mongoose";
import { StoreTypeDocument } from "../types/store";

const storeSchema = new mongoose.Schema<StoreTypeDocument>({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Items",
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders",
        },
    ],
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

}, {timestamps: true});

export const Store = mongoose.model("Store", storeSchema);