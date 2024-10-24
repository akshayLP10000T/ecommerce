import { Request, Response } from "express";
import { Store } from "../schema/store";
import { User } from "../schema/user";

export const getAllUsers = async (_: Request, res: Response)=>{
    try {

        const users = await User.find().select("-password");
        res.status(200).json({
            success: true,
            users,
        });
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getAllStoreRequest = async (req: Request, res: Response)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const giveStoreAccess = async (req: Request, res: Response)=>{
    try {

        const { userId, name, description } = req.body;

        const store = await Store.create({
            name,
            description,
            owner: userId
        });

        const user = await User.findByIdAndUpdate(userId, {store: store._id, appliedForStore: undefined, storeOwner: true});
        user?.save();
        store.save();

        return res.status(200).json({
            success: true,
            message: "Store Access given successfully",
        });
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}