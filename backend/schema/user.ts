import mongoose, { mongo } from "mongoose";
import { UserTypeDocument } from "../types/user";

const userSchema = new mongoose.Schema<UserTypeDocument>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: "",
    },
    storeOwner: {
        type: Boolean,
        required: true,
        default: false,
    },
    appliedForStore: {
        type: Boolean,
        required: true,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
        required: true,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);