import { Response, Request } from "express";
import { User } from "../schema/user";
import bcrypt from 'bcryptjs';

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