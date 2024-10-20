import { Response, Request } from "express";
import { User } from "../schema/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response)=>{
    try {

        const { fullName, email, password, age, contactNumber } = req.body;

        let user = await User.findOne({email});
        if(user){
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

        const userWithoutPassword = await User.findOne({email}).select("-password");

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

export const login = async (req: Request, res: Response)=>{
    try {

        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY!, {
            expiresIn: '3d'
        });

        res.cookie('token', token, {httpOnly: true, sameSite: 'strict', maxAge: 3*24*60*60*100});

        user.save();

        const userWithourPassword = await User.findOne({email}).select("-password");

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

export const updateProfile = async (req: Request, res: Response)=>{
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

export const logout = async (_: Request, res: Response)=>{
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