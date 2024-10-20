import mongoose from "mongoose";
import { UserType } from "../types/user";

const userSchema = new mongoose.Schema<UserType>({

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
        required: true
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
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },

}, {timestamps: true});

export const User = mongoose.model("User", userSchema);