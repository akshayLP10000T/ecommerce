import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global{
    namespace Express{
        interface Request{
            id: string;
            admin: boolean;
        }
    }
}

export const isAuthenticatedStoreOwner = async (req: Request, res: Response, next: NextFunction)=>{
    try {

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        if(!decode){
            return res.status(401).json({
                success: false,
                message: "Invalid user",
            })
        }

        if(!req.admin){
            return res.status(401).json({
                success: false,
                message: "You are not a admin",
            });
        }

        req.id = decode.storeOwnerId;
        req.admin = decode.admin;

        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}