import { Response, Request } from "express";
import { User } from "../schema/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    try {

        const { fullName, email, password, age, contactNumber } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email id already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            age,
            contactNumber,
        });

        const userWithoutPassword = await User.findOne({ email }).select("-password");

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword,
        });

    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const token = jwt.sign({
            userId: user._id,
            storeOwner: user.storeOwner,
            admin: user.admin
        }, process.env.SECRET_KEY!, {
            expiresIn: '3d'
        });

        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3 * 24 * 60 * 60 * 100 });

        user.save();

        const userWithourPassword = await User.findOne({ email }).select("-password");

        res.status(200).json({
            success: true,
            message: `Welcome Back ${user.fullName}`,
            user: userWithourPassword,
        });

    } catch (error: any) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getUserData = async (req: Request, res: Response)=>{
    try {

        const userId = req.id;

        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error please login again",
        });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {

        const userId = req.id;
        const { fullName, email, address, city, country, storeOwner } = req.body;

        const updatedData = { fullName, email, address, city, country, storeOwner };

        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true
        }).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const logout = async (_: Request, res: Response) => {
    try {

        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const applyForStore = async (req: Request, res: Response) => {
    try {

        const userId = req.id;

        const { fullName, email, age, contactNumber, city, address } = req.body;
        const data = {
            fullName,
            email,
            age,
            contactNumber,
            city,
            address,
            appliedForStore: true,
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            new: true
        }).select("-password");

        return res.status(200).json({
            success: true,
            message: "Applied for store wait till we complete your request",
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}