import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global{
    namespace Express{
        interface Request{
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}